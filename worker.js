import starterPrompts from "./prompts.js";

const allowedOrigins = new Set([
  "https://thangvt-food.github.io",
  "http://127.0.0.1:8765",
  "http://localhost:8765",
]);
const encoder = new TextEncoder();
const sessionLifetimeMs = 7 * 24 * 60 * 60 * 1000;
const starterIds = new Set(starterPrompts.map((prompt) => prompt.id));

function json(data, status, origin) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  if (origin && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }
  return new Response(JSON.stringify(data), { status, headers });
}

function base64UrlEncode(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function base64UrlDecode(value) {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function getSigningKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function issueSession(secret) {
  const payload = base64UrlEncode(encoder.encode(JSON.stringify({
    exp: Date.now() + sessionLifetimeMs,
    nonce: crypto.randomUUID(),
  })));
  const signature = await crypto.subtle.sign("HMAC", await getSigningKey(secret), encoder.encode(payload));
  return `${payload}.${base64UrlEncode(new Uint8Array(signature))}`;
}

async function hasAdminSession(request, secret) {
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return false;
  const [payload, signature, extra] = authorization.slice(7).split(".");
  if (!payload || !signature || extra) return false;
  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await getSigningKey(secret),
      base64UrlDecode(signature),
      encoder.encode(payload),
    );
    if (!valid) return false;
    const decoded = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload)));
    return Number.isFinite(decoded.exp) && decoded.exp > Date.now();
  } catch {
    return false;
  }
}

async function ensureSeeded(db) {
  const seeded = await db.prepare("SELECT value FROM app_meta WHERE key = ?")
    .bind("starter_prompts_seeded")
    .first();
  if (seeded) return;

  const statements = starterPrompts.map((prompt, index) => db.prepare(`
    INSERT OR IGNORE INTO prompts (id, title, category, content, created_at, updated_at, sort_order, builtin)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, 1)
  `).bind(prompt.id, prompt.title, prompt.category, prompt.content, index));
  statements.push(db.prepare("INSERT OR IGNORE INTO app_meta (key, value) VALUES (?, ?)")
    .bind("starter_prompts_seeded", "1"));
  await db.batch(statements);
}

async function readJson(request) {
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 700_000) throw new Response("Request body is too large.", { status: 413 });
  const text = await request.text();
  if (encoder.encode(text).byteLength > 700_000) {
    throw new Response("Request body is too large.", { status: 413 });
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Response("Request body must be valid JSON.", { status: 400 });
  }
}

function validatePrompt(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const { title, category, content } = value;
  if (typeof title !== "string" || title.trim().length < 1 || title.trim().length > 80) return null;
  if (typeof category !== "string" || category.trim().length < 1 || category.trim().length > 32) return null;
  if (typeof content !== "string" || content.trim().length < 1 || content.length > 100_000) return null;
  return {
    title: title.trim(),
    category: category.trim(),
    content: content.trim(),
  };
}

async function handleRequest(request, env) {
  const origin = request.headers.get("Origin");
  if (origin && !allowedOrigins.has(origin)) return json({ error: "Origin is not allowed." }, 403);
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin || "",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      },
    });
  }
  if (!request.url.includes("/api/")) return json({ error: "Not found." }, 404, origin);

  const url = new URL(request.url);
  const { pathname } = url;
  if (request.method === "GET" && pathname === "/api/prompts") {
    await ensureSeeded(env.DB);
    const result = await env.DB.prepare(`
      SELECT id, title, category, content, builtin
      FROM prompts
      ORDER BY sort_order ASC, created_at ASC, id ASC
    `).all();
    return json({ prompts: result.results }, 200, origin);
  }

  if (request.method === "POST" && pathname === "/api/auth") {
    if (!env.ADMIN_PASSWORD || env.ADMIN_PASSWORD.length < 24) {
      return json({ error: "Quản trị chưa được cấu hình mật khẩu đủ mạnh." }, 503, origin);
    }
    const body = await readJson(request);
    if (!body || typeof body.password !== "string" || body.password.length > 256) {
      return json({ error: "Mật khẩu không hợp lệ." }, 400, origin);
    }
    const [expected, received] = await Promise.all([
      crypto.subtle.digest("SHA-256", encoder.encode(env.ADMIN_PASSWORD)),
      crypto.subtle.digest("SHA-256", encoder.encode(body.password)),
    ]);
    const expectedBytes = new Uint8Array(expected);
    const receivedBytes = new Uint8Array(received);
    let difference = 0;
    for (let index = 0; index < expectedBytes.length; index += 1) {
      difference |= expectedBytes[index] ^ receivedBytes[index];
    }
    if (difference !== 0) return json({ error: "Mật khẩu quản trị chưa đúng." }, 401, origin);
    return json({ token: await issueSession(env.ADMIN_PASSWORD) }, 200, origin);
  }

  if (pathname.startsWith("/api/auth/")) {
    if (request.method === "GET" && pathname === "/api/auth/session") {
      const valid = env.ADMIN_PASSWORD && await hasAdminSession(request, env.ADMIN_PASSWORD);
      return valid ? json({ authenticated: true }, 200, origin) : json({ error: "Phiên đăng nhập đã hết hạn." }, 401, origin);
    }
    return json({ error: "Not found." }, 404, origin);
  }

  const sessionValid = env.ADMIN_PASSWORD && await hasAdminSession(request, env.ADMIN_PASSWORD);
  if (!sessionValid) return json({ error: "Đăng nhập quản trị để thay đổi prompt." }, 401, origin);

  if (request.method === "POST" && pathname === "/api/import") {
    const body = await readJson(request);
    if (!body || !Array.isArray(body.prompts) || body.prompts.length > 100) {
      return json({ error: "Số lượng prompt cần chuyển không hợp lệ (tối đa 100)." }, 400, origin);
    }

    const imported = [];
    for (const candidate of body.prompts) {
      const prompt = validatePrompt(candidate);
      if (!prompt || typeof candidate.id !== "string" || !/^[a-zA-Z0-9-]{1,100}$/.test(candidate.id)) {
        return json({ error: "Có prompt cũ không hợp lệ; chưa có dữ liệu nào được chuyển." }, 400, origin);
      }
      imported.push({ id: candidate.id, ...prompt });
    }

    const statements = imported.map((prompt, index) => {
      const starterIndex = starterPrompts.findIndex((starter) => starter.id === prompt.id);
      return env.DB.prepare(`
        INSERT INTO prompts (id, title, category, content, created_at, updated_at, sort_order, builtin)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          title = excluded.title,
          category = excluded.category,
          content = excluded.content,
          updated_at = CURRENT_TIMESTAMP,
          sort_order = excluded.sort_order,
          builtin = excluded.builtin
      `).bind(
        prompt.id,
        prompt.title,
        prompt.category,
        prompt.content,
        starterIndex >= 0 ? starterIndex : Date.now() + index,
        starterIndex >= 0 ? 1 : 0,
      );
    });
    if (statements.length > 0) await env.DB.batch(statements);
    return json({ imported: imported.length }, 200, origin);
  }

  const promptRoute = pathname.match(/^\/api\/prompts(?:\/([^/]+))?$/);
  if (!promptRoute) return json({ error: "Not found." }, 404, origin);
  const encodedId = promptRoute[1];
  if (request.method === "POST" && !encodedId) {
    const prompt = validatePrompt(await readJson(request));
    if (!prompt) return json({ error: "Tên, danh mục hoặc nội dung prompt không hợp lệ." }, 400, origin);
    const id = `custom-${crypto.randomUUID()}`;
    await env.DB.prepare(`
      INSERT INTO prompts (id, title, category, content, created_at, updated_at, sort_order, builtin)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, 0)
    `).bind(id, prompt.title, prompt.category, prompt.content, Date.now()).run();
    return json({ prompt: { id, ...prompt, builtin: 0 } }, 201, origin);
  }

  let id;
  try {
    id = encodedId ? decodeURIComponent(encodedId) : "";
  } catch {
    return json({ error: "Mã prompt không hợp lệ." }, 400, origin);
  }
  if (encodedId && !/^[a-zA-Z0-9-]{1,100}$/.test(id)) return json({ error: "Mã prompt không hợp lệ." }, 400, origin);

  if (request.method === "PUT" && encodedId) {
    const prompt = validatePrompt(await readJson(request));
    if (!prompt) return json({ error: "Tên, danh mục hoặc nội dung prompt không hợp lệ." }, 400, origin);
    const result = await env.DB.prepare(`
      UPDATE prompts
      SET title = ?, category = ?, content = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(prompt.title, prompt.category, prompt.content, id).run();
    if (result.meta.changes === 0) return json({ error: "Không tìm thấy prompt." }, 404, origin);
    return json({ prompt: { id, ...prompt, builtin: starterIds.has(id) ? 1 : 0 } }, 200, origin);
  }

  if (request.method === "DELETE" && encodedId) {
    if (starterIds.has(id)) return json({ error: "Không thể xóa prompt mẫu." }, 403, origin);
    const result = await env.DB.prepare("DELETE FROM prompts WHERE id = ?").bind(id).run();
    if (result.meta.changes === 0) return json({ error: "Không tìm thấy prompt." }, 404, origin);
    return json({ deleted: true }, 200, origin);
  }

  return json({ error: "Method not allowed." }, 405, origin);
}

export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env);
    } catch (error) {
      if (error instanceof Response) return json({ error: await error.text() }, error.status, request.headers.get("Origin"));
      console.error("Prompt API request failed:", error);
      return json({ error: "Máy chủ chưa xử lý được yêu cầu. Vui lòng thử lại." }, 500, request.headers.get("Origin"));
    }
  },
};
