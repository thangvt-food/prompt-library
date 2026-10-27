# Prompt Library

Thư viện prompt responsive dùng Cloudflare Worker và D1 để lưu dữ liệu đồng bộ cho mọi thiết bị.

## Dùng thử

Mở [website](https://thangvt-food.github.io/prompt-library/). Nếu muốn dùng clipboard ổn định trên thiết bị di động, hãy chạy qua HTTPS hoặc localhost.

- Tìm kiếm prompt bằng ô tìm kiếm hoặc nhấn `/`.
- Lọc theo danh mục.
- Copy ngay từ thẻ hoặc mở trình sửa để thay đổi nội dung rồi copy.
- Ai cũng có thể xem và copy prompt.
- Chỉ quản trị viên đăng nhập mới có thể thêm, sửa hoặc xóa prompt.
- Nội dung prompt mẫu và prompt tự tạo đều được lưu trong D1.
- Vì website public, mọi người đều đọc được nội dung prompt; không lưu thông tin bí mật.
- Nếu trình duyệt còn dữ liệu từ phiên bản localStorage cũ, dữ liệu sẽ được chuyển lên D1 sau lần đăng nhập quản trị đầu tiên.

## Triển khai Cloudflare

Yêu cầu Node.js 22+ và Wrangler đã đăng nhập bằng `npx wrangler login`.

1. Tạo database: `npx wrangler d1 create prompt-library-db`.
2. Dán `database_id` được trả về vào `wrangler.toml`.
3. Tạo bảng: `npm run db:migrate:remote`.
4. Deploy Worker: `npm run deploy:api` và chép URL `workers.dev` vào thẻ `meta[name="prompt-api"]` trong `index.html`.
5. Đặt mật khẩu quản trị ngẫu nhiên dài ít nhất 24 ký tự: `npx wrangler secret put ADMIN_PASSWORD`.
6. Commit và push thay đổi; GitHub Actions tự triển khai website.

Mật khẩu không nằm trong mã nguồn. Worker cấp token phiên 7 ngày; trình duyệt chỉ giữ token trong session hiện tại. CORS chỉ cho phép website GitHub Pages và localhost dùng để phát triển.

Trong lần thiết lập của repo này, mật khẩu được sinh ngẫu nhiên và lưu cục bộ trong file `.admin-password` (đã được Git ignore). Đọc file này để đăng nhập. Để đổi mật khẩu, chạy `npx wrangler secret put ADMIN_PASSWORD`, nhập mật khẩu mới rồi xóa/thay file cũ.

## Phát triển và cập nhật D1

- `npm run dev:api`: chạy Worker cục bộ.
- `npm run db:migrate:local`: áp dụng migration vào D1 local.
- `npm run db:migrate:remote`: áp dụng migration lên D1 production.
- `npm run deploy:api`: deploy API Worker.
- Thay đổi schema: thêm migration mới vào `migrations/` rồi chạy migrate remote.
- Quản lý prompt mẫu và prompt riêng qua giao diện sau khi đăng nhập; D1 là nguồn dữ liệu chính sau lần khởi tạo đầu tiên.
