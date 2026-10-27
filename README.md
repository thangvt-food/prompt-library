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
5. Tạo mã quản trị bằng [admin-key.html](./admin-key.html) và đặt Secret `ADMIN_PASSWORD` qua Cloudflare Dashboard như hướng dẫn bên dưới (không cần lệnh CLI cho việc quản lý mã).
6. Commit và push thay đổi; GitHub Actions tự triển khai website.

Mã quản trị không nằm trong mã nguồn. Worker cấp token phiên 7 ngày; khi hết hạn bạn chỉ cần đăng nhập lại bằng cùng mã quản trị — mã này không tự hết hạn. CORS chỉ cho phép website GitHub Pages và localhost dùng để phát triển.

## Tạo hoặc đổi mã quản trị

1. Mở file [admin-key.html](./admin-key.html) trực tiếp trên máy (không cần server, CLI hay kết nối mạng).
2. Nhấn **Tạo mã mới**, rồi sao chép mã hoặc tải file lưu riêng. Mã được tạo bằng bộ sinh số an toàn của trình duyệt và có 256-bit entropy.
3. Vào [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → `prompt-library-api` → **Settings** → **Variables and Secrets**.
4. Sửa hoặc thêm Secret `ADMIN_PASSWORD`, dán mã vừa tạo rồi lưu/deploy Worker.
5. Đăng nhập lại website bằng mã mới. Việc đổi mã sẽ làm phiên quản trị cũ hết hiệu lực.

Trang HTML tạo mã hoàn toàn offline; nó không thể tự sửa Secret trên Cloudflare (để không phải nhúng API token có quyền quản trị vào file). Hãy lưu mã/file đã tải ở nơi riêng tư, đừng commit hay chia sẻ — bất kỳ ai có mã đều có thể sửa thư viện. File `.admin-password` trong workspace là bản cục bộ đã được Git ignore; cập nhật bản sao này khi đổi mã.

## Phát triển và cập nhật D1

- `npm run dev:api`: chạy Worker cục bộ.
- `npm run db:migrate:local`: áp dụng migration vào D1 local.
- `npm run db:migrate:remote`: áp dụng migration lên D1 production.
- `npm run deploy:api`: deploy API Worker.
- Thay đổi schema: thêm migration mới vào `migrations/` rồi chạy migrate remote.
- Quản lý prompt mẫu và prompt riêng qua giao diện sau khi đăng nhập; D1 là nguồn dữ liệu chính sau lần khởi tạo đầu tiên.
