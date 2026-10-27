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

## App Android và Linux

Ứng dụng đóng gói dùng WebView mở website production, vì vậy thay đổi giao diện trên website sẽ tự cập nhật trong app; cần có Internet để tải thư viện. Mã nguồn không tải hay build Android/Linux trên laptop.

- Vào GitHub repo → **Actions** → **Build desktop and Android apps** → **Run workflow** để tạo APK Android và AppImage Linux.
- Mở lần chạy workflow đó, tải artifact `prompt-library-android-debug` hoặc `prompt-library-linux-x64`.
- APK là bản debug để cài thủ công trên Android; Linux dùng AppImage x86_64.
- Muốn phát hành bản gắn version: tạo/push tag dạng `app-v1.0.0`. Workflow sẽ build cả hai và đính kèm file vào GitHub Release.
- Linux AppImage cần quyền execute; mở file bằng `./Prompt-Library-*.AppImage` hoặc cấp quyền chạy trong trình quản lý file.
- Cài APK tải từ Actions có thể yêu cầu cho phép cài ứng dụng không rõ nguồn trong Android.

Workflow chạy build trên GitHub-hosted runners; không cần Android SDK, Rust hay WebKit cài trên máy cá nhân.

## Triển khai Cloudflare

Yêu cầu Node.js 22+ và Wrangler đã đăng nhập bằng `npx wrangler login`.

1. Tạo database: `npx wrangler d1 create prompt-library-db`.
2. Dán `database_id` được trả về vào `wrangler.toml`.
3. Tạo bảng: `npm run db:migrate:remote`.
4. Deploy Worker: `npm run deploy:api` và chép URL `workers.dev` vào thẻ `meta[name="prompt-api"]` trong `index.html`.
5. Sau khi Worker đã deploy, đặt Secret `ADMIN_PASSWORD` bằng công cụ local bên dưới.
6. Commit và push thay đổi; GitHub Actions tự triển khai website.

Mã quản trị không nằm trong mã nguồn. Worker cấp token phiên 7 ngày; khi hết hạn bạn chỉ cần đăng nhập lại bằng cùng mã quản trị — mã này không tự hết hạn. CORS chỉ cho phép website GitHub Pages và localhost dùng để phát triển.

## Tạo hoặc đổi mã quản trị

1. Tạo một Cloudflare API token với quyền **Workers Scripts:Write** trên account chứa Worker `prompt-library-api`.
2. Trong thư mục dự án, chạy `npm run admin:key`; mở `http://127.0.0.1:8788/` được in ra.
3. Nhấn **Tạo mã mới**, dán API token rồi chọn **Đẩy lên Cloudflare**.
4. Đăng nhập lại website bằng mã vừa tạo. Việc đổi mã sẽ làm phiên quản trị cũ hết hiệu lực.

Trang HTML vẫn có thể mở để tạo mã offline, nhưng thao tác đẩy chỉ bật tại địa chỉ localhost do helper cục bộ phục vụ. Helper gọi Cloudflare API trực tiếp từ máy bạn để tránh giới hạn CORS; API token chỉ được gửi tới localhost rồi Cloudflare, không ghi vào log hay lưu thành file/trình duyệt. Đóng helper bằng `Ctrl+C` sau khi xong.

Không dùng Global API Key. API token có quyền Workers Scripts:Write có thể sửa Worker trong phạm vi account được cấp; hãy tạo token riêng, giới hạn account và thu hồi sau khi dùng nếu muốn. Mã quản trị cũng cho phép sửa thư viện, vì vậy không chia sẻ mã/file đã tải.

## Phát triển và cập nhật D1

- `npm run dev:api`: chạy Worker cục bộ.
- `npm run db:migrate:local`: áp dụng migration vào D1 local.
- `npm run db:migrate:remote`: áp dụng migration lên D1 production.
- `npm run deploy:api`: deploy API Worker.
- Thay đổi schema: thêm migration mới vào `migrations/` rồi chạy migrate remote.
- Quản lý prompt mẫu và prompt riêng qua giao diện sau khi đăng nhập; D1 là nguồn dữ liệu chính sau lần khởi tạo đầu tiên.
