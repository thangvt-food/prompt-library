const starterPrompts = [
  {
    id: "outline-report",
    title: "Lập đề cương báo cáo học thuật",
    category: "Học tập",
    content: `# NHIỆM VỤ: XÂY DỰNG ĐỀ CƯƠNG KHUNG CHO BÀI BÁO CÁO HỌC THUẬT

Bạn là trợ lý học thuật, có nhiệm vụ xây dựng đề cương khung (outline cấp cao) cho một bài báo cáo chuyên ngành.

## Đầu vào
- File đính kèm.

## Yêu cầu về cấu trúc
- Tạo đề cương theo phong cách và mức độ chi tiết của tài liệu mẫu được cung cấp.
- Chia bài thành khoảng 5–7 phần lớn, tùy theo bản chất chủ đề.
- Mỗi phần chỉ có 2–4 tiểu mục quan trọng.
- Chỉ sử dụng tối đa 2 cấp phân cấp: phần lớn và tiểu mục trực thuộc.
- Không tạo mục con bên trong tiểu mục.
- Mỗi tiểu mục là một cụm từ hoặc câu ngắn mô tả nhóm nội dung cần trình bày, đủ rộng để triển khai thành một phần trong báo cáo.
- Ưu tiên gộp các ý có quan hệ gần nhau; không viết nội dung triển khai, giải thích, ví dụ hoặc câu hỏi gợi ý dưới mỗi tiểu mục.

## Nguyên tắc xây dựng nội dung
- Bám sát chủ đề chính, không mở rộng sang kiến thức ngoài phạm vi cần thiết.
- Sắp xếp logic từ giới thiệu vấn đề, tổng quan đối tượng, cơ chế hoặc nội dung trọng tâm, bằng chứng nghiên cứu và ứng dụng đến kết luận.
- Chỉ giữ lại những phần thực sự cần thiết; không bắt buộc mọi đề tài có cấu trúc giống nhau.
- Phân biệt phần tổng quan kiến thức nền với phần phân tích trọng tâm.
- Tránh trùng lặp; không thêm mục chỉ để đề cương trông đầy đủ.
- Nếu có tài liệu nguồn, dùng tài liệu để xác định nhóm nội dung quan trọng; không biến từng tiêu đề thành một tiểu mục riêng.

## Định dạng đầu ra
CHỦ ĐỀ: [Tên đề tài]

PHẦN 1. [TÊN PHẦN]
- [Tiểu mục]
- [Tiểu mục]

PHẦN 2. [TÊN PHẦN]
- [Tiểu mục]
- [Tiểu mục]

Tiếp tục cho đến phần kết luận. Có thể dùng dấu chấm cuối câu thay cho dấu gạch đầu dòng nếu phù hợp với tài liệu mẫu.

## Kiểm tra trước khi xuất
Tự rà soát xem có tiểu mục nào quá nhỏ cần gộp, nội dung nào trùng lặp hoặc không liên quan, có vô tình tạo cấp mục thứ ba hay không, và đề cương có đủ khung để phân chia và viết bài thay vì trở thành dàn ý diễn giải chi tiết không.

Chỉ xuất đề cương cuối cùng sau khi rà soát. Không trình bày quá trình suy luận hoặc giải thích cách xây dựng đề cương.`,
  },
  {
    id: "analyze-outline",
    title: "Phân tích cấu trúc tài liệu mẫu",
    category: "Học tập",
    content: `Trước khi lập đề cương, hãy phân tích tài liệu mẫu đính kèm để xác định:
- Số lượng phần lớn thường dùng.
- Số tiểu mục trung bình trong mỗi phần.
- Độ dài và cách đặt tên tiểu mục.
- Mức độ khái quát của từng tiểu mục.
- Cách tổ chức trình tự nội dung từ tổng quan đến trọng tâm và ứng dụng.

Sau đó, áp dụng các đặc điểm cấu trúc này vào chủ đề mới. Chỉ kế thừa phong cách tổ chức và mức độ chi tiết, không sao chép tiêu đề hoặc nội dung chuyên môn của tài liệu mẫu.

Nếu chủ đề mới cần cấu trúc khác để bảo đảm logic, hãy điều chỉnh hợp lý nhưng vẫn giữ nguyên nguyên tắc: đề cương khung, ít tiểu mục, không phân cấp sâu.`,
  },
  {
    id: "scientific-paper",
    title: "Phân tích cấu trúc bài báo khoa học",
    category: "Nghiên cứu",
    content: `# WORKFLOW: PHÂN TÍCH CẤU TRÚC BÀI BÁO KHOA HỌC

## Vai trò
Bạn là trợ lý phân tích tài liệu khoa học chuyên ngành Công nghệ thực phẩm, Công nghệ sinh học và Vi sinh vật thực phẩm.

Nhiệm vụ là phân tích cấu trúc tri thức của bài báo, trích xuất keyword và nhóm nội dung trọng tâm, sau đó xây dựng đề cương khung ngắn gọn phản ánh logic của bài báo gốc.

Đây KHÔNG phải nhiệm vụ tóm tắt bài báo theo từng đoạn, dịch toàn văn hay lập dàn ý chi tiết.

## Giai đoạn 1 — Nhận diện bài báo
Đọc thông tin thư mục, abstract, introduction, các heading và conclusion để xác định:
- Tên và loại bài báo.
- Vấn đề khoa học chính.
- Mục tiêu hoặc câu hỏi nghiên cứu.
- Đối tượng và phạm vi nghiên cứu.
- Luận điểm hoặc thông điệp trung tâm.

Phân loại bài báo thành review article, original research article hoặc loại khác. Không mặc định cấu trúc của mọi bài báo phải giống nhau.

## Giai đoạn 2 — Bóc tách cấu trúc và keyword
Phân tích heading, subheading và nội dung bên trong để xác định ý nghĩa thực sự của từng phần. Tạo bảng làm việc gồm:
1. Nhóm nội dung.
2. Keyword tiếng Anh.
3. Thuật ngữ tiếng Việt tương ứng.
4. Ý nghĩa hoặc vai trò của nhóm nội dung trong bài báo.
5. Vị trí nguồn: heading, trang hoặc phần liên quan.
6. Mức độ quan trọng: trọng tâm, hỗ trợ hoặc bổ sung.

Quy tắc:
- Giữ thuật ngữ tiếng Anh chuyên ngành khi cần thiết.
- Chỉ giữ thuật ngữ giúp xác định chủ đề, cơ chế, yếu tố ảnh hưởng, phương pháp, kết quả hoặc ứng dụng; không liệt kê mọi từ khóa xuất hiện.
- Gộp keyword có quan hệ trực tiếp thành nhóm nội dung; không nhầm keyword với tiêu đề outline.
- Phân biệt nội dung tác giả trình bày trực tiếp với nội dung AI suy luận.
- Với bảng, biểu đồ hoặc sơ đồ quan trọng, ghi chú và đối chiếu nội dung liên quan; không bỏ qua chú thích hay phần chữ được trích xuất.

## Giai đoạn 3 — Xác định logic nội dung
Từ các nhóm nội dung đã bóc tách, xác định nội dung nền tảng, cơ chế hoặc quan hệ nguyên nhân–kết quả, yếu tố ảnh hưởng hoặc nội dung so sánh, kết quả và bằng chứng quan trọng, giải pháp hoặc ứng dụng thực tiễn, cùng nội dung phụ có thể lược bỏ khi xây dựng outline.

Chỉ chọn nhóm phù hợp với loại bài báo và mục tiêu của tác giả. Không ép bài báo phải có đủ mọi nhóm trên.

## Giai đoạn 4 — Thiết kế outline riêng
Xây dựng đề cương khung phản ánh cấu trúc tri thức của bài báo.
- Khoảng 4–7 phần lớn nếu nội dung cho phép.
- Mỗi phần có khoảng 2–4 tiểu mục.
- Tối đa hai cấp phân cấp: phần lớn và tiểu mục trực thuộc.
- Mỗi tiểu mục là cụm từ ngắn thể hiện nhóm nội dung có thể triển khai thành một phần khi viết báo cáo.
- Không giải thích bên dưới tiểu mục; không thêm gạch đầu dòng diễn giải.
- Không tạo mục riêng cho từng thuật ngữ, ví dụ, thí nghiệm hoặc kết quả nhỏ.
- Gộp nội dung gần nhau nếu cùng phục vụ một luận điểm; không kéo dài outline để tạo cảm giác đầy đủ.
- Ưu tiên tiêu đề ngắn, rõ nghĩa, đúng thuật ngữ chuyên ngành.

Nếu là review article, ưu tiên cấu trúc theo chủ đề và mối quan hệ giữa các chủ đề. Nếu là original research article, phân biệt bối cảnh, mục tiêu, phương pháp, kết quả và thảo luận; chỉ đưa phương pháp vào outline nếu phù hợp với mục tiêu sử dụng tài liệu.

Không sao chép máy móc toàn bộ heading của bài báo gốc. Có thể tổ chức lại khi cần nhưng không làm thay đổi ý nghĩa khoa học.

## Giai đoạn 5 — Kiểm chứng
Tự kiểm tra căn cứ của từng phần, các ý quan trọng có bị bỏ sót không, có nội dung trùng lặp hoặc quá nhỏ không, phân cấp có sâu hơn hai cấp không, outline có phản ánh đúng trọng tâm không và có kết luận nào vượt quá bằng chứng không.

Nếu không thể xác minh nội dung do thiếu trang, lỗi OCR hoặc không đọc được hình ảnh, hãy ghi rõ; không tự điền thông tin.

## Đầu ra cuối cùng
Trình bày đúng bốn phần:

### A. NHẬN DIỆN BÀI BÁO
Tên bài báo, loại bài, mục tiêu và thông điệp trung tâm; tối đa 5 dòng.

### B. BẢNG KEYWORD
Bảng keyword Anh–Việt, nhóm nội dung, vai trò và vị trí nguồn. Chỉ giữ nhóm quan trọng, tránh liệt kê tràn lan.

### C. OUTLINE ĐỀ XUẤT
Chỉ hiển thị tên chủ đề, các phần lớn và tiểu mục trực thuộc. Đây phải là phần ngắn gọn nhất, không có nội dung diễn giải.

### D. CĂN CỨ VÀ LƯU Ý
Nêu điểm quan trọng cần kiểm tra, phần không đọc được hoặc suy luận chưa chắc chắn. Nếu không có vấn đề, ghi rõ chưa phát hiện hạn chế đáng kể.

Không trình bày nhật ký suy luận, không viết lại toàn bộ bài báo, không tự tạo tài liệu tham khảo hoặc số trang.`,
  },
];

const storageKey = "prompt-library-state-v1";
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
};

let state;
let activeFilter = "Tất cả";
let editingId = null;
let toastTimer;
state = readState();

function readState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return {
      custom: Array.isArray(saved.custom) ? saved.custom : [],
      overrides: saved.overrides && typeof saved.overrides === "object" ? saved.overrides : {},
    };
  } catch {
    announce("Không thể đọc dữ liệu đã lưu. Thư viện mặc định vẫn khả dụng.");
    return { custom: [], overrides: {} };
  }
}

function persistState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error("Could not save prompt library:", error);
    announce("Không thể lưu thay đổi trên thiết bị này.");
    return false;
  }
}

function allPrompts() {
  return [
    ...starterPrompts.map((prompt) => ({ ...prompt, ...state.overrides[prompt.id] })),
    ...state.custom,
  ];
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
  const prompts = allPrompts();
  const categories = ["Tất cả", ...new Set(prompts.map((prompt) => prompt.category).filter(Boolean))];
  if (!categories.includes(activeFilter)) activeFilter = "Tất cả";

  elements.count.textContent = `${prompts.length} prompt`;
  elements.filters.innerHTML = categories.map((category) => `
    <button class="filter-chip${category === activeFilter ? " active" : ""}" type="button"
      data-filter="${escapeHtml(category)}" aria-pressed="${category === activeFilter}">
      ${escapeHtml(category)}
    </button>
  `).join("");

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
        <button class="card-menu" type="button" data-action="edit" data-id="${escapeHtml(prompt.id)}"
          aria-label="Sửa ${escapeHtml(prompt.title)}" title="Sửa prompt">···</button>
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

function announce(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("visible"), 2300);
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
  editingId = prompt?.id ?? null;
  elements.heading.textContent = editingId ? "Chỉnh sửa prompt" : "Tạo prompt mới";
  elements.title.value = prompt?.title ?? "";
  elements.category.value = prompt?.category ?? "";
  elements.content.value = prompt?.content ?? "";
  elements.delete.hidden = !editingId || starterPrompts.some((item) => item.id === editingId);
  updateCharacterCount();
  elements.dialog.showModal();
  elements.title.focus();
}

function updateCharacterCount() {
  elements.characterCount.textContent = `${elements.content.value.length.toLocaleString("vi")} ký tự`;
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
  const prompt = allPrompts().find((item) => item.id === button.dataset.id);
  if (!prompt) return;
  if (button.dataset.action === "copy") void copyText(prompt.content);
  if (button.dataset.action === "edit") openEditor(prompt);
});

elements.search.addEventListener("input", render);
elements.content.addEventListener("input", updateCharacterCount);
document.querySelector("#add-prompt").addEventListener("click", () => openEditor());
document.querySelector("#close-editor").addEventListener("click", () => elements.dialog.close());
document.querySelector("#cancel-editor").addEventListener("click", () => elements.dialog.close());
document.querySelector("#copy-editor").addEventListener("click", () => void copyText(elements.content.value));

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const prompt = {
    id: editingId ?? `custom-${crypto.randomUUID()}`,
    title: elements.title.value.trim(),
    category: elements.category.value.trim(),
    content: elements.content.value.trim(),
  };
  if (!prompt.title || !prompt.category || !prompt.content) {
    announce("Vui lòng nhập tên, danh mục và nội dung prompt.");
    return;
  }

  const isStarter = starterPrompts.some((item) => item.id === prompt.id);
  if (isStarter) {
    state.overrides[prompt.id] = { title: prompt.title, category: prompt.category, content: prompt.content };
  } else {
    const index = state.custom.findIndex((item) => item.id === prompt.id);
    if (index >= 0) state.custom[index] = prompt;
    else state.custom.push(prompt);
  }

  if (persistState()) {
    elements.dialog.close();
    render();
    announce(editingId ? "Đã lưu thay đổi." : "Đã thêm prompt mới.");
  }
});

elements.delete.addEventListener("click", () => {
  if (!editingId || starterPrompts.some((item) => item.id === editingId)) return;
  state.custom = state.custom.filter((item) => item.id !== editingId);
  if (persistState()) {
    elements.dialog.close();
    render();
    announce("Đã xóa prompt.");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !elements.dialog.open && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    elements.search.focus();
  }
});

render();
