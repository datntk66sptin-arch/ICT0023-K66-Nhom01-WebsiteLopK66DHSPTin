# BÀI TẬP LỚN: WEBSITE LỚP K66 ĐHSP TIN

- **Học phần:** Phát triển ứng dụng Web (ICT0023)
- **Mã lớp học phần:** ICT0023-K66
- **Nhóm thực hiện:** Nhóm 01
- **Đề tài:** Website lớp K66 ĐHSP Tin
- **Đối tượng người dùng:** Ban cán sự lớp và sinh viên lớp K66 Sư phạm Tin học

## 🔗 Liên kết truy cập (Links)

- **Website công khai (GitHub Pages):** [https://datntk66sptin-arch.github.io/ICT0023-K66-Nhom01-WebsiteLopK66DHSPTin/](https://datntk66sptin-arch.github.io/ICT0023-K66-Nhom01-WebsiteLopK66DHSPTin/)
- **Mã nguồn (GitHub Repository):** [https://github.com/datntk66sptin-arch/ICT0023-K66-Nhom01-WebsiteLopK66DHSPTin](https://github.com/datntk66sptin-arch/ICT0023-K66-Nhom01-WebsiteLopK66DHSPTin)
- **Video Demo & Thuyết trình (YouTube Unlisted):** [https://youtu.be/Hgq6uw4ieqg](https://youtu.be/Hgq6uw4ieqg)
- **Thư mục lưu trữ sản phẩm (Google Drive):** [https://drive.google.com/drive/folders/1E1UieJQI1LQoKHAv_aFTW0jC1CfA50jT?usp=sharing](https://drive.google.com/drive/folders/1E1UieJQI1LQoKHAv_aFTW0jC1CfA50jT?usp=sharing)

## 1. Thông tin thành viên và phân công nhiệm vụ

| STT | Họ và tên | Tài khoản GitHub | Email sinh viên | Vai trò | Phân công nhiệm vụ chi tiết |
|---|---|---|---|---|---|
| 1 | **Nguyễn Tiến Đạt** | [@datntk66sptin-arch](https://github.com/datntk66sptin-arch) | datnt.k66sptin@utb.edu.vn | Trưởng nhóm / UI-UX | Quản lý dự án, thiết kế UI/UX, dựng khung HTML/CSS trang chủ (`index.html`), phụ trách duyệt và hợp nhất mã nguồn qua Pull Request trên GitHub. |
| 2 | **Nguyễn Tấn Tài** | [@taintk66sptin-dot](https://github.com/taintk66sptin-dot) | taint.k66sptin@utb.edu.vn | Dẫn hướng / Data | Thiết kế cấu trúc điều hướng toàn trang, quản lý mảng dữ liệu lịch học, xây dựng trang Thời khóa biểu (`tkb.html`) và lập trình bộ lọc TKB theo thứ trong tuần. |
| 3 | **Khuất Anh Tú** | [@tukak66sptin-png](https://github.com/tukak66sptin-png) | tuka.k66sptin@utb.edu.vn | Lập trình viên | Lập trình trang Danh sách thành viên (`members.html`), phát triển công cụ JavaScript bốc thăm ngẫu nhiên phân công nhiệm vụ/trực nhật (`random.html`). |
| 4 | **Tòng Văn Dương** | [@duongtvk66sptin-byte](https://github.com/duongtvk66sptin-byte) | duongtv.k66sptin@utb.edu.vn | Kiểm thử viên (Tester) | Xây dựng trang Liên hệ / Phản hồi (`contact.html`), lập trình Form Validation, phối hợp hoàn thiện album ảnh hoạt động, kiểm thử giao diện và sửa lỗi Console. |

---

## 2. Cấu trúc Website & Trang chức năng

Website xây dựng gồm **05 trang HTML độc lập** dùng chung thanh điều hướng (`Navbar`) và chân trang (`Footer`), đảm bảo responsive mượt mà trên mọi thiết bị:

1. **Trang chủ (`index.html`):** Giới thiệu tổng quan về lớp K66 ĐHSP Tin, danh sách thông báo mới nhất, lịch sinh hoạt lớp và album ảnh hoạt động tập thể (sử dụng Carousel và Card Bootstrap).
2. **Trang Thành viên (`members.html`):** Hiển thị danh sách đầy đủ thành viên lớp có ảnh đại diện, vai trò (Ban cán sự, Tổ trưởng, Thành viên) và tổ sinh hoạt; tích hợp bộ lọc theo tổ/vai trò và ô tìm kiếm theo tên.
3. **Trang Thời khóa biểu (`tkb.html`):** Lịch học chi tiết theo tuần của lớp; tích hợp bộ lọc xem lịch học theo từng thứ trong tuần (Từ Thứ 2 đến Thứ 7).
4. **Trang Bốc thăm trực nhật (`random.html`):** Công cụ JavaScript tương tác bốc thăm ngẫu nhiên phân công trực nhật/nhiệm vụ lớp từ danh sách sinh viên nhập vào, sinh ra kết quả trực tiếp kèm nút "Dùng thử" (Sample Data) và "Đặt lại" (Reset).
5. **Trang Liên hệ / Góp ý (`contact.html`):** Form gửi phản hồi tới Ban cán sự lớp có kiểm tra tính hợp lệ dữ liệu đầu vào (Validation: bắt buộc nhập, định dạng email), hiển thị thông báo lỗi rõ ràng và phản hồi kết quả ngay trên trang.

## 3. Yêu cầu kỹ thuật & Các chức năng tương tác

### 3.1. Kỹ thuật Frontend (HTML5, CSS3, Bootstrap 5)
- **HTML5 ngữ nghĩa:** Sử dụng chuẩn các thẻ ngữ nghĩa `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<table>`, `<form>`, `<label>`; ảnh có thẻ `alt`, form có `label` đầy đủ.
- **CSS3 & Bootstrap Grid Responsive:** Bố cục nhất quán bằng tệp CSS ngoài (`assets/style.css`) và lưới Bootstrap 5 (`container`, `row`, `col-*`), không bị tràn ngang và dễ đọc trên điện thoại di động.
- **Thành phần Bootstrap tích hợp:** Navbar responsive, Cards thông tin, Modal thông báo, Accordion câu hỏi thường gặp, Alerts thông báo form.

### 3.2. Ba chức năng tương tác JavaScript bắt buộc
1. **Render dữ liệu từ mảng đối tượng:** Đổ dữ liệu thành viên (`membersData`) và lịch học (`scheduleData`) từ mảng đối tượng JavaScript ra giao diện HTML động.
2. **Tìm kiếm & Lọc dữ liệu:**
   - Lọc thành viên lớp theo Tổ (Tổ 1, 2, 3) hoặc theo Vai trò (Ban cán sự, Thành viên) và tìm kiếm tên trực tiếp.
   - Lọc thời khóa biểu theo từng thứ trong tuần.
3. **Kiểm tra Form (Validation) & Xử lý tính toán tức thời:**
   - Kiểm tra lỗi nhập liệu Form góp ý (`contact.html`), cảnh báo lỗi tức thì.
   - Thuật toán bốc thăm ngẫu nhiên (`random.html`) xử lý danh sách và sinh ra kết quả phân công tức thời mà không cần tải lại trang.
   - Cung cấp nút **"Dùng thử"** (nạp dữ liệu mẫu) và nút **"Đặt lại"** (xoá trắng dữ liệu) hỗ trợ kiểm thử nhanh.

### 3.3. Ứng dụng jQuery
- Áp dụng jQuery cho các thao tác lắng nghe sự kiện, hiệu ứng ẩn/hiện (`fadeIn`, `fadeOut`, `slideToggle`) và hỗ trợ bộ lọc dữ liệu nhanh trong tệp `assets/script.js`.

### 3.4. Bảng vị trí sử dụng cú pháp JavaScript & jQuery trong mã nguồn

| Cú pháp / Khái niệm JS | Vị trí xuất hiện chi tiết trong Mã nguồn (`assets/script.js`, `assets/tenthanhvien.js`) |
|---|---|
| **Biến & Kiểu dữ liệu** | Khai báo `const`, `let` lưu mảng `membersList`, `scheduleList`, kiểu String, Number, Boolean. |
| **Toán tử** | Toán tử so sánh (`===`, `!==`), logic (`&&`, `||`), toán tử 3 ngôi kiểm tra trạng thái dữ liệu rỗng. |
| **Cấu trúc điều khiển** | `if...else` kiểm tra lỗi Form Validation; `switch...case` xử lý lọc thời khóa biểu theo ngày. |
| **Vòng lặp** | Dùng `forEach`, `filter`, `map` để duyệt mảng thành viên và render cấu trúc HTML ra DOM. |
| **Hàm & Xâu** | Xây dựng hàm render, hàm bốc thăm `Math.random()`, xử lý xâu với `.trim()`, `.toLowerCase()`, `.includes()`. |
| **Mảng & Đối tượng** | Mảng chứa các đối tượng thành viên `{ id, name, role, group, avatar }`. |
| **DOM & Sự kiện** | Bắt sự kiện `addEventListener('submit')`, `addEventListener('click')`, `addEventListener('input')`, cập nhật `innerHTML`. |
| **jQuery** | Thao tác `$(document).ready()`, bắt sự kiện `$('#searchBtn').on('click')`, hiệu ứng `$('.member-card').fadeIn()`. |

## 4. Kế hoạch phát triển & Mốc lưu phiên bản (Tags)

Lịch sử phát triển được quản lý chặt chẽ qua 5 mốc phiên bản (Git Tags) trên GitHub:

- **`v0.1-y-tuong`**: Khởi tạo repository Public, thống nhất đề tài Website lớp K66 ĐHSP Tin, phân công nhiệm vụ (`CONTRIBUTIONS.md`) và tạo cấu trúc thư mục dự án.
- **`v0.2-html`**: Hoàn thành khung cấu trúc chuẩn HTML5 ngữ nghĩa cho cả 5 trang web (`index.html`, `members.html`, `tkb.html`, `random.html`, `contact.html`).
- **`v0.3-giao-dien`**: Tối ưu giao diện CSS ngoài và lưới Bootstrap 5, đảm bảo tính responsive chuẩn trên màn hình máy tính và thiết bị di động.
- **`v0.4-tuong-tac`**: Tích hợp các đoạn mã JavaScript/jQuery xử lý mảng dữ liệu, bộ lọc TKB, tìm kiếm thành viên, thuật toán bốc thăm và kiểm tra lỗi form.
- **`v1.0-final`**: Tối ưu toàn bộ mã nguồn, kiểm thử không còn lỗi Console trên cửa sổ ẩn danh, hoàn thiện tài liệu `README.md`, `SOURCES.md`, kích hoạt GitHub Pages và cập nhật video demo.

## 5. Danh mục sản phẩm nộp quy định

1. **Website công khai (GitHub Pages):** Hoạt động tĩnh 100% trên trình duyệt, các liên kết chuyển trang và công cụ tương tác chạy mượt mà.
2. **Repository GitHub Public:** Đầy đủ các commit đúng nội dung, luồng làm việc Pull Request và 5 thẻ mốc Tag.
3. **Bộ tài liệu Markdown đầy đủ:**
   - `README.md`: Báo cáo tổng quan dự án và hướng dẫn nghiệm thu.
   - `CONTRIBUTIONS.md`: Nhật ký đóng góp và phân công chi tiết của 4 thành viên.
   - `SOURCES.md`: Khai báo 4 mục (Tài liệu tham khảo, Mã tham khảo, Ảnh/Dữ liệu, Công cụ AI).
4. **Liên kết thư mục Google Drive:** Chứa mã nguồn đóng gói (.zip), Slide thuyết trình (.pptx), Video demo (.mp4) và tệp dữ liệu kiểm thử.

## 6. Cam kết liêm chính học thuật

Nhóm 01 - Lớp ICT0023-K66 xin cam kết:
- Website lớp K66 ĐHSP Tin do các thành viên trong nhóm tự phân tích, thiết kế giao diện và lập trình mã nguồn. Nhóm không sao chép repository, template có sẵn hoặc dùng AI để tạo thay sản phẩm cốt lõi.
- Mọi tài liệu, thư viện mã nguồn tham khảo (Bootstrap, jQuery), hình ảnh dữ liệu và công cụ AI hỗ trợ đều được khai báo minh bạch trong tệp `SOURCES.md`.
- Cả 04 thành viên đều hiểu rõ mã nguồn, vận hành thành thạo các chức năng và sẵn sàng giải thích, chỉnh sửa phần việc do mình phụ trách khi giảng viên kiểm tra.

*Sơn La, ngày 18 tháng 10 năm 2026*  
**Đại diện Nhóm 01 - Trưởng nhóm:** Nguyễn Tiến Đạt
