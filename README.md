# 💌 Website Rủ Người Yêu Đi Ăn Lãng Mạn & Dễ Thương ✨

Trang web tương tác được thiết kế riêng để bạn gửi lời mời hẹn hò đầy ngọt ngào, bất ngờ và hài hước tới người thương.

---

## 🌟 Các Tính Năng Nổi Bật

1. **Phong thư tình yêu mở đầu**:
   - Hiệu ứng mở phong bao thư 3D với tem trái tim phát sáng.
   - Nhạc nền piano/music box du dương tự động khởi chạy khi mở thư (có nút bật/tắt ở góc trên bên phải).
   - Hiệu ứng canvas mưa tim và hạt bụi sao lấp lánh nền (click bất kỳ đâu để tạo chùm tim bay).

2. **Câu hỏi hẹn hò & Nút né tránh tinh nghịch**:
   - Mascot chú gấu ôm tim hoạt hình đung đưa cực đáng yêu.
   - Nút **"Dạ đi chớ! 🥰"** phát sáng và tự động phóng to dần khi người ấy chần chừ.
   - Nút **"Hong thèm 😝"** nghịch ngợm: mỗi lần rê chuột hoặc chạm tay vào sẽ tự động "nhảy né" chỗ khác kèm lời nhắn trêu chọc hài hước (*"Nút này biểu tình rùi", "Bấm nút kia cơ..."*).

3. **Menu chọn món & thời gian**:
   - Cho phép người yêu tự do chọn món ăn yêu thích:
     - 🍲 Lẩu nướng xì xèo ấm áp
     - 🥩 Steak & Nến thơm lãng mạn
     - 🍣 Sushi & Đồ Nhật tươi ngon
     - 🧋 Phố ăn vặt & Trà sữa full topping
     - ✨ Tuỳ ý em hết
   - Chọn khung giờ hẹn và nhập lời nhắn/dặn dò riêng.

4. **Tấm vé hẹn hò đặc quyền (VIP Date Ticket)**:
   - Tấm vé phong cách Boarding Pass với hiệu ứng viền răng cưa, con dấu mộc đỏ `APPROVED ✔️` và mã vạch tình yêu.
   - **Tự do đổi tên**: Bạn hoặc người yêu có thể chạm/bấm trực tiếp vào phần tên người yêu & người mời trên vé để chỉnh sửa biệt danh riêng.
   - Nút **"Gửi kết quả cho anh qua Zalo"** & **"Sao chép lời nhắn ngọt ngào"** để người yêu gửi lại phản hồi kèm các lựa chọn chỉ với 1 chạm.

---

## 🚀 Cách Chạy & Trải Nghiệm

### Cách 1: Mở trực tiếp (Nhanh nhất)
Chỉ cần nhấp đúp (Double-click) vào tệp [`index.html`](file:///C:/Users/Admin/.gemini/antigravity/scratch/romantic_date_invite/index.html) để mở trên bất kỳ trình duyệt nào (Chrome, Edge, Cốc Cốc, Safari...).

### Cách 2: Chạy Local Server với Python
Mở Terminal tại thư mục dự án và chạy:
```bash
python -m http.server 8080
```
Sau đó truy cập: `http://localhost:8080` trên trình duyệt.

---

## 🌐 Cách Đưa Lên Mạng Để Gửi Link Cho Người Yêu (Miễn phí 100%)

Để người yêu có thể mở trên điện thoại mọi lúc mọi nơi qua một đường link cực xịn:

1. **Vercel / Netlify Drop (Đơn giản nhất - 30 giây)**:
   - Truy cập [app.netlify.com/drop](https://app.netlify.com/drop)
   - Kéo thả toàn bộ thư mục `romantic_date_invite` vào trang web.
   - Bạn sẽ nhận ngay một đường link công khai (ví dụ: `hen-ho-cung-em.netlify.app`) để gửi ngay cho người yêu!

2. **GitHub Pages**:
   - Đẩy mã nguồn lên một repository GitHub mới.
   - Vào mục **Settings** -> **Pages** -> chọn nhánh `main` và lưu.
   - Đường link sẽ có dạng: `https://<ten-user>.github.io/<ten-repo>/`.

---

## 🎨 Tùy Biến Thêm Theo Ý Thích

- **Đổi bài hát yêu thích**: Nếu bạn muốn dùng một bài nhạc cụ thể (như bài hát kỷ niệm của 2 bạn), hãy copy tệp `music.mp3` vào thư mục này, và trong `index.html` thêm thuộc tính `src="music.mp3"` vào thẻ `<audio id="bgAudio" src="music.mp3" loop></audio>`.
- **Đổi danh sách món ăn**: Mở [`index.html`](file:///C:/Users/Admin/.gemini/antigravity/scratch/romantic_date_invite/index.html), tìm đến khối `<div class="food-grid">` và chỉnh sửa tên các món ăn theo sở thích của người yêu.
