export default [
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
