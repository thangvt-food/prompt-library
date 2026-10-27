import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const host = "127.0.0.1";
const port = 8788;
const accountId = "399f21d93bf5b1c07da0514ff2c4f4ef";
const workerName = "prompt-library-api";
const page = await readFile(new URL("./admin-key.html", import.meta.url));

function send(response, status, body, contentType = "application/json; charset=utf-8") {
  response.writeHead(status, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
    "X-Frame-Options": "DENY",
  });
  response.end(body);
}

async function readJson(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 8_192) throw new Error("Request body is too large.");
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new Error("Request body must be valid JSON.");
  }
}

const server = createServer(async (request, response) => {
  if (request.headers.host !== `${host}:${port}`) {
    send(response, 403, JSON.stringify({ error: "Host is not allowed." }));
    return;
  }

  if (request.method === "GET" && (request.url === "/" || request.url === "/admin-key.html")) {
    send(response, 200, page, "text/html; charset=utf-8");
    return;
  }

  if (request.method !== "POST" || request.url !== "/api/update-secret") {
    send(response, 404, JSON.stringify({ error: "Not found." }));
    return;
  }

  if (request.headers.origin !== `http://${host}:${port}`) {
    send(response, 403, JSON.stringify({ error: "Request must come from the local admin page." }));
    return;
  }

  if (!request.headers["content-type"]?.startsWith("application/json")) {
    send(response, 415, JSON.stringify({ error: "Content-Type must be application/json." }));
    return;
  }

  let apiToken;
  try {
    const body = await readJson(request);
    apiToken = body?.apiToken;
    const { secret } = body ?? {};
    if (typeof apiToken !== "string" || apiToken.length < 20 || apiToken.length > 512) {
      send(response, 400, JSON.stringify({ error: "Cloudflare API token không hợp lệ." }));
      return;
    }
    if (typeof secret !== "string" || !/^[a-f0-9]{64}$/.test(secret)) {
      send(response, 400, JSON.stringify({ error: "Hãy tạo mã SHA-256 gồm đúng 64 ký tự hex." }));
      return;
    }

    let cloudflareResponse;
    try {
      cloudflareResponse = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${workerName}/secrets`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "ADMIN_PASSWORD",
            text: secret,
            type: "secret_text",
          }),
          signal: AbortSignal.timeout(20_000),
        },
      );
    } catch (error) {
      send(response, 502, JSON.stringify({
        error: error.name === "TimeoutError"
          ? "Cloudflare phản hồi quá chậm. Hãy thử lại."
          : "Không kết nối được Cloudflare API. Hãy kiểm tra kết nối mạng.",
      }));
      return;
    }
    const result = await cloudflareResponse.json().catch(() => ({}));
    if (!cloudflareResponse.ok || result.success !== true) {
      const errorCode = result.errors?.map((error) => error.code).filter(Number.isFinite).join(", ");
      const message = cloudflareResponse.status === 401 || cloudflareResponse.status === 403
        ? "Cloudflare từ chối token. Kiểm tra API token và quyền Workers Scripts:Write."
        : errorCode
          ? `Cloudflare API từ chối yêu cầu (mã lỗi ${errorCode}).`
          : `Cloudflare API trả về lỗi HTTP ${cloudflareResponse.status}.`;
      send(response, cloudflareResponse.status >= 400 && cloudflareResponse.status < 600
        ? cloudflareResponse.status
        : 502, JSON.stringify({ error: message }));
      return;
    }

    send(response, 200, JSON.stringify({ success: true }));
  } catch (error) {
    send(response, 400, JSON.stringify({ error: error.message || "Yêu cầu không hợp lệ." }));
  } finally {
    apiToken = undefined;
  }
});

server.on("error", (error) => {
  console.error("Could not start the local admin helper:", error.message);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`Prompt Library admin helper: http://${host}:${port}/`);
  console.log("Only this computer can access it. Press Ctrl+C to stop.");
});
