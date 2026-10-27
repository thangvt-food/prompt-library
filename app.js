const apiBaseUrl = document.querySelector('meta[name="prompt-api"]').content;
const authStorageKey = "prompt-library-admin-session";
const legacyStorageKey = "prompt-library-state-v1";
const legacyMigrationKey = "prompt-library-d1-migration-v1";
const elements = {
  count: document.querySelector("#prompt-count"),
  grid: document.querySelector("#prompt-grid"),
  filters: document.querySelector("#filter-list"),
  search: document.querySelector("#search-input"),
  dialog: document.querySelector("#editor-dialog"),
  form: document.querySelector("#editor-form"),
  title: document.querySelector("#prompt-title"),
  category: document.querySelector("#prompt-category"),
  content: document.querySelector("#prompt-content"),
  characterCount: document.querySelector("#character-count"),
  heading: document.querySelector("#editor-heading"),
  delete: document.querySelector("#delete-prompt"),
  toast: document.querySelector("#toast"),
  add: document.querySelector("#add-prompt"),
  authButton: document.querySelector("#auth-button"),
  loginDialog: document.querySelector("#login-dialog"),
  loginForm: document.querySelector("#login-form"),
  password: document.querySelector("#admin-password"),
};

let prompts = [];
let activeFilter = "Tất cả";
let editingId = null;
let adminToken = sessionStorage.getItem(authStorageKey);
let isAdmin = false;
let toastTimer;

function announce(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("visible"), 2600);
}

async function apiRequest(path, { method = "GET", body, authenticated = false } = {}) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (authenticated && adminToken) headers.Authorization = `Bearer ${adminToken}`;
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && authenticated) {
      adminToken = null;
      isAdmin = false;
      sessionStorage.removeItem(authStorageKey);
      render();
    }
    throw new Error(payload.error || `Server trả về lỗi ${response.status}.`);
  }
  return payload;
}

async function loadPrompts() {
  elements.grid.innerHTML = `<div class="empty-state"><strong>Đang tải thư viện…</strong><span>Dữ liệu đang được đồng bộ.</span></div>`;
  try {
    const result = await apiRequest("/api/prompts");
    prompts = result.prompts;
    render();
  } catch (error) {
    console.error("Could not load prompts:", error);
    elements.grid.innerHTML = `
      <div class="empty-state">
        <strong>Chưa kết nối được thư viện</strong>
        <span>${escapeHtml(error.message)} Hãy thử tải lại trang sau.</span>
      </div>
    `;
    elements.count.textContent = "Chưa đồng bộ";
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function render() {
  const categories = ["Tất cả", ...new Set(prompts.map((prompt) => prompt.category).filter(Boolean))];
  if (!categories.includes(activeFilter)) activeFilter = "Tất cả";

  elements.count.textContent = `${prompts.length} prompt`;
  elements.filters.innerHTML = categories.map((category) => `
    <button class="filter-chip${category === activeFilter ? " active" : ""}" type="button"
      data-filter="${escapeHtml(category)}" aria-pressed="${category === activeFilter}">
      ${escapeHtml(category)}
    </button>
  `).join("");
  elements.authButton.textContent = isAdmin ? "Đăng xuất" : "Đăng nhập quản trị";
  elements.authButton.setAttribute("aria-label", isAdmin ? "Đăng xuất quản trị" : "Đăng nhập quản trị");
  elements.add.disabled = !isAdmin;
  elements.add.title = isAdmin ? "" : "Đăng nhập quản trị để thêm prompt";
  elements.add.innerHTML = isAdmin
    ? '<span aria-hidden="true">＋</span> Tạo prompt'
    : '<span aria-hidden="true">＋</span> Đăng nhập để sửa';

  const query = elements.search.value.trim().toLocaleLowerCase("vi");
  const visible = prompts.filter((prompt) => {
    const matchesCategory = activeFilter === "Tất cả" || prompt.category === activeFilter;
    const matchesQuery = !query || `${prompt.title} ${prompt.category} ${prompt.content}`.toLocaleLowerCase("vi").includes(query);
    return matchesCategory && matchesQuery;
  });

  if (visible.length === 0) {
    elements.grid.innerHTML = `
      <div class="empty-state">
        <strong>Chưa tìm thấy prompt nào</strong>
        <span>Thử từ khóa khác hoặc tạo một prompt mới nhé.</span>
      </div>
    `;
    return;
  }

  elements.grid.innerHTML = visible.map((prompt) => `
    <article class="prompt-card">
      <div class="card-top">
        <span class="category-label">${escapeHtml(prompt.category)}</span>
        ${isAdmin ? `<button class="card-menu" type="button" data-action="edit" data-id="${escapeHtml(prompt.id)}"
          aria-label="Sửa ${escapeHtml(prompt.title)}" title="Sửa prompt">···</button>` : ""}
      </div>
      <h3>${escapeHtml(prompt.title)}</h3>
      <p class="prompt-preview">${escapeHtml(prompt.content)}</p>
      <div class="card-footer">
        <span class="prompt-length">${prompt.content.length.toLocaleString("vi")} ký tự</span>
        <button class="copy-button" type="button" data-action="copy" data-id="${escapeHtml(prompt.id)}">↗ Copy nhanh</button>
      </div>
    </article>
  `).join("");
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const temporary = document.createElement("textarea");
      temporary.value = text;
      temporary.style.position = "fixed";
      temporary.style.opacity = "0";
      document.body.append(temporary);
      temporary.select();
      const copied = document.execCommand("copy");
      temporary.remove();
      if (!copied) throw new Error("Clipboard copy command was rejected.");
    }
    announce("Đã copy prompt vào clipboard.");
  } catch (error) {
    console.error("Could not copy prompt:", error);
    announce("Không thể copy. Hãy kiểm tra quyền clipboard của trình duyệt.");
  }
}

function openEditor(prompt) {
  if (!isAdmin) {
    announce("Đăng nhập quản trị để chỉnh sửa prompt.");
    return;
  }
  editingId = prompt?.id ?? null;
  elements.heading.textContent = editingId ? "Chỉnh sửa prompt" : "Tạo prompt mới";
  elements.title.value = prompt?.title ?? "";
  elements.category.value = prompt?.category ?? "";
  elements.content.value = prompt?.content ?? "";
  elements.delete.hidden = !prompt || prompt.builtin;
  updateCharacterCount();
  elements.dialog.showModal();
  elements.title.focus();
}

function updateCharacterCount() {
  elements.characterCount.textContent = `${elements.content.value.length.toLocaleString("vi")} ký tự`;
}

async function verifySavedSession() {
  if (!adminToken) return;
  try {
    await apiRequest("/api/auth/session", { authenticated: true });
    isAdmin = true;
  } catch (error) {
    console.info("No active admin session:", error.message);
  }
}

async function migrateLegacyData() {
  if (localStorage.getItem(legacyMigrationKey)) return 0;
  const raw = localStorage.getItem(legacyStorageKey);
  if (!raw) {
    localStorage.setItem(legacyMigrationKey, "1");
    return 0;
  }

  const legacy = JSON.parse(raw);
  const migrated = [];
  if (legacy.overrides && typeof legacy.overrides === "object") {
    for (const [id, override] of Object.entries(legacy.overrides)) {
      const starter = starterPrompts.find((prompt) => prompt.id === id);
      if (starter && override && typeof override === "object") {
        migrated.push({ ...starter, ...override });
      }
    }
  }
  if (Array.isArray(legacy.custom)) {
    migrated.push(...legacy.custom);
  }

  if (migrated.length > 0) {
    await apiRequest("/api/import", {
      method: "POST",
      body: { prompts: migrated },
      authenticated: true,
    });
  }
  localStorage.removeItem(legacyStorageKey);
  localStorage.setItem(legacyMigrationKey, "1");
  return migrated.length;
}

elements.filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  render();
});

elements.grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const prompt = prompts.find((item) => item.id === button.dataset.id);
  if (!prompt) return;
  if (button.dataset.action === "copy") void copyText(prompt.content);
  if (button.dataset.action === "edit") openEditor(prompt);
});

elements.search.addEventListener("input", render);
elements.content.addEventListener("input", updateCharacterCount);
elements.add.addEventListener("click", () => openEditor());
document.querySelector("#close-editor").addEventListener("click", () => elements.dialog.close());
document.querySelector("#cancel-editor").addEventListener("click", () => elements.dialog.close());
document.querySelector("#copy-editor").addEventListener("click", () => void copyText(elements.content.value));

elements.authButton.addEventListener("click", () => {
  if (isAdmin) {
    adminToken = null;
    isAdmin = false;
    sessionStorage.removeItem(authStorageKey);
    render();
    announce("Đã đăng xuất.");
    return;
  }
  elements.loginForm.reset();
  elements.loginDialog.showModal();
  elements.password.focus();
});

document.querySelector("#close-login").addEventListener("click", () => elements.loginDialog.close());
document.querySelector("#cancel-login").addEventListener("click", () => elements.loginDialog.close());

elements.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = elements.loginForm.querySelector('[type="submit"]');
  button.disabled = true;
  try {
    const { token } = await apiRequest("/api/auth", {
      method: "POST",
      body: { password: elements.password.value },
    });
    adminToken = token;
    sessionStorage.setItem(authStorageKey, token);
    isAdmin = true;
    let migratedCount = 0;
    let migrationFailed = false;
    try {
      migratedCount = await migrateLegacyData();
    } catch (error) {
      migrationFailed = true;
      console.error("Could not migrate local prompts:", error);
      announce(`Đăng nhập thành công, nhưng chưa chuyển được dữ liệu cũ: ${error.message}`);
    }
    elements.loginDialog.close();
    render();
    if (migratedCount > 0) {
      await loadPrompts();
      announce(`Đã chuyển ${migratedCount} prompt cũ lên D1.`);
    } else if (migratedCount === 0 && !migrationFailed) {
      announce("Đăng nhập quản trị thành công.");
    }
  } catch (error) {
    console.error("Admin login failed:", error);
    announce(error.message);
  } finally {
    button.disabled = false;
    elements.password.value = "";
  }
});

elements.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const prompt = {
    title: elements.title.value.trim(),
    category: elements.category.value.trim(),
    content: elements.content.value.trim(),
  };
  if (!prompt.title || !prompt.category || !prompt.content) {
    announce("Vui lòng nhập tên, danh mục và nội dung prompt.");
    return;
  }

  const isEditing = Boolean(editingId);
  try {
    await apiRequest(isEditing ? `/api/prompts/${encodeURIComponent(editingId)}` : "/api/prompts", {
      method: isEditing ? "PUT" : "POST",
      body: prompt,
      authenticated: true,
    });
    elements.dialog.close();
    await loadPrompts();
    announce(isEditing ? "Đã lưu thay đổi lên D1." : "Đã thêm prompt lên D1.");
  } catch (error) {
    console.error("Could not save prompt:", error);
    announce(error.message);
  }
});

elements.delete.addEventListener("click", async () => {
  if (!editingId || !isAdmin) return;
  try {
    await apiRequest(`/api/prompts/${encodeURIComponent(editingId)}`, {
      method: "DELETE",
      authenticated: true,
    });
    elements.dialog.close();
    await loadPrompts();
    announce("Đã xóa prompt khỏi D1.");
  } catch (error) {
    console.error("Could not delete prompt:", error);
    announce(error.message);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !elements.dialog.open && !elements.loginDialog.open &&
      !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    elements.search.focus();
  }
});

async function initialize() {
  await loadPrompts();
  await verifySavedSession();
  render();
}

void initialize();
