# BÀI TẬP LỚN: WEBSITE LỚP K66 ĐHSP TIN
- **Học phần:** Phát triển ứng dụng Web (ICT0023)
- **Mã lớp học phần:** ICT0023-K66
- **Nhóm thực hiện:** Nhóm 01
- **Đề tài:** Website lớp K66 ĐHSP Tin

## 🔗 Liên kết truy cập (Links)
- **Website công khai (GitHub Pages):** [https://datntk66sptin-arch.github.io/ICT0023-K66-Nhom01-WebsiteLopK66DHSPTin/](https://datntk66sptin-arch.github.io/ICT0023-K66-Nhom01-WebsiteLopK66DHSPTin/)
- **Mã nguồn (GitHub Repository):** [https://github.com/datntk66sptin-arch/ICT0023-K66-Nhom01-WebsiteLopK66DHSPTin](https://github.com/datntk66sptin-arch/ICT0023-K66-Nhom01-WebsiteLopK66DHSPTin)
- **Video Demo & Thuyết trình (YouTube Unlisted):** [Cập nhật link video YouTube tại đây]

## 1. Thông tin thành viên và phân công nhiệm vụ
- **Nguyễn Tiến Đạt** (Điều phối viên - Trưởng nhóm)
  - **Tài khoản GitHub:** [@datntk66sptin-arch](https://github.com/datntk66sptin-arch)
  - **Email:** datnt.k66sptin@utb.edu.vn
  - **Nhiệm vụ:** Quản lý dự án, dựng khung HTML và giao diện trang chủ (`index.html`), phụ trách hợp nhất mã nguồn qua Pull Request.

- **Nguyễn Tấn Tài** (Người dẫn hướng)
  - **Tài khoản GitHub:** [@taintk66sptin-dot](https://github.com/taintk66sptin-dot)
  - **Email:** taint.k66sptin@utb.edu.vn
  - **Nhiệm vụ:** Thiết kế cấu trúc điều hướng, xây dựng trang Thời khóa biểu (`tkb.html`) và lập trình bộ lọc thời khóa biểu theo thứ trong tuần.

- **Khuất Anh Tú** (Người gõ mã)
  - **Tài khoản GitHub:** [@tukak66sptin-png](https://github.com/tukak66sptin-png)
  - **Email:** tuka.k66sptin@utb.edu.vn
  - **Nhiệm vụ:** Xây dựng trang Danh sách thành viên (`members.html`), lập trình công cụ JavaScript bốc thăm phân công trực nhật (`random.html`).

- **Tòng Văn Dương** (Người kiểm thử)
  - **Tài khoản GitHub:** [@duongtvk66sptin-byte](https://github.com/duongtvk66sptin-byte)
  - **Email:** duongtv.k66sptin@utb.edu.vn
  - **Nhiệm vụ:** Phát triển trang Liên hệ / Form góp ý (`contact.html`) có kiểm tra tính hợp lệ dữ liệu (Validation) và phối hợp xây dựng album ảnh hoạt động trên trang chủ.

## 2. Cấu trúc Website & Trang chức năng
1. **Trang chủ (`index.html`):** Giới thiệu tổng quan lớp K66 ĐHSP Tin, thông báo mới nhất và album ảnh hoạt động tập thể.
2. **Trang Thành viên (`members.html`):** Hiển thị danh sách thành viên lớp có ảnh, vai trò, tổ; tích hợp bộ lọc và tìm kiếm theo tổ/vai trò.
3. **Trang Thời khóa biểu (`tkb.html`):** Lịch học chi tiết theo tuần, công cụ lọc môn học theo thứ trong tuần.
4. **Trang Bốc thăm trực nhật (`random.html`):** Công cụ JavaScript bốc thăm ngẫu nhiên phân công nhiệm vụ / trực nhật lớp.
5. **Trang Liên hệ / Góp ý (`contact.html`):** Form gửi phản hồi có kiểm tra lỗi dữ liệu đầu vào (Validation) và phản hồi tức thời.

## 3. Các chức năng tương tác JavaScript & jQuery
- **Render dữ liệu:** Đổ dữ liệu thành viên và lịch học từ mảng đối tượng JavaScript / tệp JSON cục bộ ra giao diện HTML.
- **Lọc & Tìm kiếm:** Lọc thời khóa biểu theo từng thứ trong tuần, tra cứu thành viên theo tên hoặc tổ.
- **Kiểm tra Form & Xử lý tức thời:** Kiểm tra tính hợp lệ của Form góp ý (định dạng email, bắt buộc nhập), bốc thăm ngẫu nhiên danh sách trực nhật và hiển thị kết quả trực tiếp trên trang mà không tải lại.
- **Sử dụng jQuery:** Áp dụng jQuery cho các thao tác bắt sự kiện, ẩn/hiện thành phần và hiệu ứng lọc dữ liệu mượt mà.
- **Trải nghiệm người dùng:** Tích hợp nút "Dùng thử" (Sample Data) và "Đặt lại" (Reset) giúp kiểm thử nhanh chóng.

## 4. Kế hoạch phát triển và lưu mốc phiên bản (Tags)
- `v0.1-y-tuong`: Hoàn thiện ý tưởng đề tài, tài liệu phân công nhiệm vụ và cấu trúc thư mục ban đầu.
- `v0.2-html`: Hoàn thành bộ khung cấu trúc HTML cho 5 trang của website.
- `v0.3-giao-dien`: Hoàn thiện giao diện responsive bằng CSS và hệ thống lưới Bootstrap 5.
- `v0.4-tuong-tac`: Hoàn thiện các tính năng xử lý dữ liệu và công cụ tương tác bằng JavaScript/jQuery.
- `v1.0-final`: Tối ưu mã nguồn, kiểm thử toàn diện trên trình duyệt và chuẩn bị báo cáo hoàn chỉnh.

## 5. Danh mục các sản phẩm nộp theo quy định
