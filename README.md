# Thiệp cưới Công Định & Thủy Tiên — hai đầu cầu TP. Hồ Chí Minh & Hải Phòng — bản GitHub Pages

**Bản này đã build sẵn. Bạn có thể push toàn bộ thư mục lên GitHub, chọn Pages từ `main` / `docs` và mở thiệp ngay. Không cần Python/Flask hoặc máy chủ riêng.**

## Cập nhật V5 — hai đầu cầu

Màn mở thiệp có hai lựa chọn thay cho nút “Mở thiệp cưới”:

- **Đầu cầu TP. Hồ Chí Minh** — thiệp nhà gái: Lễ vu quy 09:00 Chủ Nhật 20/12/2026 (tức ngày 12 tháng 11 năm Bính Ngọ) tại tư gia nhà gái, Phường An Nhơn; Tiệc chung vui 11:00 (đón khách 11h00 · khai tiệc 12h00) tại Trung tâm hội nghị – Yến tiệc THE ADORA ATHENA, Sảnh CRYSTAL – Tầng trệt, Số 371 Nguyễn Kiệm, Phường Hạnh Thông, TP. Hồ Chí Minh.
- **Đầu cầu Hải Phòng** — thiệp nhà trai, giữ nguyên nội dung V4.

Trong thiệp có nút chuyển sang đầu cầu còn lại (trên thanh menu và dưới phần thời gian – địa điểm). Thiệp nhà gái đặt tên cô dâu và gia đình nhà gái trước, kèm địa chỉ hai gia đình.

- Nội dung hai đầu cầu nằm trong `lib/card.ts` (`brideCard`, `groomCard`). Trang quản lý → **Nội dung thiệp** có nút chọn đầu cầu để sửa riêng từng thiệp.
- Mỗi khách có **một** phản hồi; RSVP ghi lại đầu cầu khách chọn (cột **Đầu cầu** trong Google Sheet và Excel). Nếu khách đổi đầu cầu rồi gửi lại, phản hồi cũ được thay thế. Thống kê có số người theo từng đầu cầu.
- Google Apps Script mới thay đổi cột của tab RSVP, nên hãy dùng **Google Sheet mới** khi kết nối (chạy `setupSheet` như hướng dẫn bên dưới).

## Cập nhật V4

Code được nâng cấp theo bộ thiệp Thuỳ – Hưng; thông tin, câu chữ, ảnh, logo và tông màu của thiệp giữ nguyên như V3.

- Toàn bộ thông tin thiệp nằm trong `lib/card.ts` (một nơi duy nhất), hỗ trợ thiệp nhà trai / nhà gái (`side`).
- Lễ và tiệc có ngày, giờ, ngày âm lịch, tầng/sảnh riêng; có thể bỏ phần tiệc (để trống địa điểm tiệc) — khi đó thiệp chỉ còn một thẻ sự kiện và ô chọn chương trình trong RSVP tự ẩn.
- Thẻ sự kiện hiện thêm thứ, ngày và ngày âm lịch. Đồng hồ đếm ngược tính đến **tiệc mừng (11:30)**.
- File lịch `.ics` có giờ kết thúc cho từng sự kiện.
- Trang quản lý có thêm các ô: tên lễ, tầng/sảnh, ngày và âm lịch riêng của tiệc, thành phố hiển thị. Apps Script kiểm tra dữ liệu theo cấu trúc mới.
- Font Playfair Display tự lưu trữ thay Georgia (Georgia trên Windows thiếu một số dấu tiếng Việt).
- Thêm thẻ `og:` để hiện ảnh xem trước khi chia sẻ link qua Zalo/Messenger/Facebook.

**Lưu ý khi đã có Google Sheet từ V3:** cập nhật `google-apps-script/Code.gs` mới rồi triển khai lại, sau đó vào **Nội dung thiệp** kiểm tra và bấm **Lưu nội dung thiệp** một lần để điền các ô mới.

## Đã có trong bản này

- Màn mở thiệp dùng ảnh hai bạn cầm giấy chứng nhận kết hôn; bấm **Mở thiệp cưới** để hai phần bìa mở ra, rồi nội dung hiện lên nhẹ nhàng. Tự giảm chuyển động theo cài đặt thiết bị.
- Nhạc do bạn cung cấp, phát khi bấm mở thiệp, tăng dần từ 0 đến 55% trong 8 giây. Nút nhạc bên phải dùng để bật/tắt; nếu trình duyệt chặn lần đầu, chạm lại nút nhạc.
- Đúng font **UVF Mussica Swash**, file TTF đi kèm và có đầy đủ dấu tiếng Việt cho các tiêu đề. Không phụ thuộc font cài trên máy khách.
- Logo từ PDF đã cung cấp, ảnh gốc được giữ nguyên; không tạo lại khuôn mặt.
- Trang thiệp, lịch trình, bản đồ, đếm ngược, lưu lịch, chia sẻ, xác nhận tham dự và lời chúc.
- **Trang mới `tao-loi-moi.html`**: nhập một tên hoặc nhiều tên (mỗi dòng một khách), xem trước, tạo và sao chép link để gửi ngay. Không cần đăng nhập hoặc kết nối Google Sheets để tạo link.
- Tên khách thay toàn bộ **“Bạn và những người thương”** ở cả màn mở thiệp và phần lời mời. Ô tên RSVP cũng điền sẵn theo link.
- Trang quản lý `quan-ly.html`: tạo nhiều thiệp theo tên (mỗi dòng một khách, tối đa 100 mỗi lần), sao chép link, giới hạn số người, tạm đóng/mở link, xem phản hồi, sửa nội dung, tải Excel.
- Link riêng có dạng `index.html?guest=<mã-ngẫu-nhiên>`, hoạt động trong repo con của GitHub Pages.

## 1. Push lên GitHub và bật Pages

1. Giải nén ZIP. Upload **toàn bộ nội dung** vào repository của bạn.
2. Mở repository → **Settings → Pages**.
3. Chọn **Deploy from a branch → main → /docs → Save**.
4. Khi GitHub báo triển khai xong, mở URL dạng `https://USERNAME.github.io/TEN-REPO/`.
5. Trang tạo lời mời ở `https://USERNAME.github.io/TEN-REPO/tao-loi-moi.html`. Trang quản lý ở `https://USERNAME.github.io/TEN-REPO/quan-ly.html`.

Nếu dùng Git trên máy:

```bash
git init
git add .
git commit -m "Add wedding invitation with RSVP, personalized links and music"
git branch -M main
git remote add origin https://github.com/USERNAME/TEN-REPO.git
git push -u origin main
```

Thay USERNAME/TEN-REPO bằng repository thật. Đăng nhập GitHub theo cách bạn đang sử dụng; mã nguồn không chứa tài khoản hay token Git.

## 2. Kết nối lưu RSVP và quản lý link — thực hiện một lần

GitHub Pages chạy giao diện tĩnh. Bản này dùng **Google Apps Script + Google Sheets** để lưu phản hồi trên máy chủ. Trước khi cấu hình, bạn vẫn xem được thiệp và nghe nhạc; gửi RSVP/quản lý dữ liệu sẽ hiện thông báo chưa kết nối, không báo lưu thành công giả.

1. Tạo **một Google Sheet mới**, giữ quyền chia sẻ **Restricted/Riêng tư**. Không công khai bảng dữ liệu khách.
2. Trong Sheet, chọn **Extensions/Tiện ích mở rộng → Apps Script**.
3. Thay nội dung `Code.gs` bằng file `google-apps-script/Code.gs` trong gói này.
4. Chạy hàm **setupSheet**, chọn đúng tài khoản và cấp quyền. Hàm tạo hai tab **Khách mời** và **RSVP**, giữ ID bảng trong Script Properties.
5. Chạy **setupAdminPassword**, nhập mật khẩu quản trị mới ít nhất 12 ký tự. Mật khẩu được lưu dưới dạng băm có salt; không ghi mật khẩu vào file website.
6. Chọn **Deploy → New deployment → Web app**. **Execute as: Me**, **Who has access: Anyone**. Xác nhận quyền nếu Google yêu cầu.
7. Sao chép URL Web App kết thúc bằng **/exec**. Không dùng URL `/dev`.
8. Mở file **docs/config.js**, dán URL vừa lấy vào `appsScriptUrl` và commit/push file này. Nếu sau này build lại, cập nhật cả `public/config.js` để không mất cấu hình.

Ví dụ:

```js
window.WEDDING_SITE = {
  mode: "static",
  appsScriptUrl: "https://script.google.com/macros/s/MA_TRIEN_KHAI_CUA_BAN/exec",
  musicVolume: 0.55,
  musicFadeSeconds: 8
};
```

URL `/exec` là địa chỉ dịch vụ; **mật khẩu quản trị và session token không được đưa vào config.js hoặc Git**. Nếu sửa mã Apps Script, mở **Manage deployments → Edit → New version → Deploy** để bản `/exec` dùng mã mới.

File `appsscript.json` đi kèm là cấu hình tham khảo nếu bạn bật hiển thị manifest trong Apps Script. Không cần tự ghi Spreadsheet ID hay mật khẩu vào mã nguồn.

## 3. Tạo và gửi link theo tên khách

### Tạo link nhanh trên trang mới

1. Mở **`tao-loi-moi.html`** sau khi website đã lên GitHub Pages (hoặc khi chạy thử bằng máy chủ local).
2. Nhập đúng tên muốn hiện, ví dụ **Anh Minh và chị Hà**, **Gia đình cô Lan**. Mỗi dòng tạo một link riêng, tối đa 100 link mỗi lần. Không tự thêm chữ “Bạn” hoặc “và những người thương”.
3. Bấm **Tạo link lời mời**, rồi **Sao chép link** hoặc **Sao chép tất cả**. Dùng **Xem thiệp** để kiểm tra tên và hiệu ứng mở thiệp trước khi gửi.
4. Gửi link qua Zalo, Messenger hoặc email. Link có dạng `index.html?to=<tên-khách>&ref=<mã-riêng>`; chữ tiếng Việt, dấu cách và ký tự đặc biệt được mã hóa tự động.

Tên và mã nằm ngay trong link; trang tạo không lưu danh sách khách trên máy chủ. Hãy giữ các link đã sao chép để dùng lại. Mỗi lần bấm tạo là một bộ link mới. Với cùng một link, khách gửi lại RSVP sẽ cập nhật cùng bản ghi, kể cả mở link ở trình duyệt khác. Ô phản hồi không đọc lại câu trả lời cũ của dạng link nhanh; tính năng đó có ở link quản lý bên dưới. Sau khi cấu hình Google Sheets ở mục 2, phản hồi và lời chúc từ link nhanh xuất hiện trong **Lời hồi đáp**, nhóm **Khách tự xác nhận**. Tên trên link nhanh có thể được người giữ link sửa; dùng link quản lý nếu cần tên được kiểm tra ở máy chủ.

### Tạo thiệp có danh sách quản lý, giới hạn người và trạng thái đã mở

1. Mở `quan-ly.html`, đăng nhập bằng mật khẩu đã đặt ở bước trên.
2. Chọn **Tạo thiệp mời**, nhập mỗi dòng một tên, chọn xưng hô, nhóm, số người tối đa và lời nhắn nếu có.
3. Nhấn **Tạo link thiệp mời**, sao chép và gửi link cho đúng khách.
4. Khách sẽ thấy tên mình trên màn mở thiệp và trong nội dung. Tên đã gắn theo link được kiểm tra ở Apps Script, không chỉ dựa vào tham số tên trên trình duyệt.
5. Khách chọn tham dự/không tham dự/chưa xác nhận, số người và lời chúc. Gửi lại cùng link cập nhật bản ghi cũ, không cộng thêm khách trùng.
6. Mở mục **Lời hồi đáp** để xem dữ liệu. Bấm **Tải Excel** để nhận file `.xlsx` có 3 sheet **RSVP, Khách mời, Thống kê**.

Phiên quản trị hết hạn sau 8 giờ. Đổi mật khẩu qua hàm `setupAdminPassword` sẽ làm các phiên cũ hết hiệu lực. Đăng xuất khi dùng máy chung.

Trong Sheet, cột cuối chứa JSON nguồn và được ẩn để giữ nguyên ký tự/lời chúc; chỉnh dữ liệu qua trang quản lý để phần nguồn và phần hiển thị khớp nhau. Lời chúc chỉ có chủ thiệp đọc được qua trang quản lý và bảng dữ liệu riêng tư.

**Dữ liệu của bản GitHub Pages nằm trong Google Sheet bạn tạo. Dữ liệu từ bản xem trước trên hosting khác không tự chuyển sang Sheet này. Có thể tải Excel từ bản cũ để lưu trước khi chuyển.**

## 4. Đổi tên, ngày giờ và địa điểm

Sau khi kết nối Google Sheets, vào **Nội dung thiệp → Lưu nội dung thiệp**. Các link đang dùng sẽ đọc thông tin mới. Muốn bỏ phần tiệc, để trống ô *Địa điểm* của tiệc. Nếu chưa kết nối Google Sheets, sửa `lib/card.ts` (và `DEFAULT_CONFIG` trong `google-apps-script/Code.gs`) rồi build lại. Mặc định đang dùng Công Định & Thủy Tiên, ngày 26.12.2026, lễ 09:30 và tiệc 11:30 tại Hải Phòng, theo thông tin đã cung cấp.

## 5. Chạy thử trên Windows

Chạy `start_windows.bat`, mở **http://localhost:8080**. Cần Python đã có trên máy, không cần cài thêm thư viện. Hoặc chạy:

```bash
python -m http.server 8080 --directory docs
```

Không mở HTML bằng `file://` vì trình duyệt có thể chặn module JavaScript và tính năng âm thanh.

## 6. Sửa giao diện và build lại

- `docs/`: website đã build, dùng trực tiếp cho GitHub Pages.
- `app/`, `lib/`, `github-pages/`: mã nguồn React/TypeScript dùng chung.
- `public/images/`: ảnh và logo. `public/audio/`: nhạc. `public/fonts/`: font và thông tin nguồn.
- `public/config.js`: cấu hình nguồn sẽ được chép sang docs khi build.
- `google-apps-script/`: mã máy chủ chạy trong tài khoản Google của bạn.

Cần Node.js từ 22.13 trở lên:

```bash
npm install
npm run typecheck
npm run build
```

Commit cả mã nguồn và `docs/` sau khi build. Với giao diện chạy sẵn, chỉ việc dùng `docs/`; không cần npm trước khi push.

## Kiểm thử bản xuất

Đã kiểm tra biên dịch TypeScript, build tĩnh đủ ba trang với đường dẫn tương đối cho repo con; mã hóa/đọc lại tên khách tiếng Việt, mã phản hồi riêng từng link; logic phát nhạc; hợp đồng RSVP/quản trị Apps Script trên môi trường giả lập Google Sheets; và cập nhật RSVP của link nhanh trên SQLite. **Chưa thực hiện triển khai Google Apps Script vào tài khoản của bạn hoặc kiểm thử giao diện/animation trên trình duyệt thực tế.** Sau khi cấu hình `/exec`, hãy tạo một khách thử, mở link, gửi và cập nhật phản hồi, đối chiếu Sheet và tải Excel trước khi gửi hàng loạt.

## Nguồn tài nguyên và tài liệu

Ảnh, logo và nhạc do bạn cung cấp. Font UVF Mussica Swash lấy từ https://font2s.com/fonts/50796/uvf_mussica_swash.html, giữ file ReadMe gốc tại `public/fonts/FONT-README.txt` và `docs/fonts/FONT-README.txt`.

- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Google Apps Script Web Apps: https://developers.google.com/apps-script/guides/web
- Content Service: https://developers.google.com/apps-script/guides/content
- Trình duyệt và phát âm thanh khi tương tác: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
