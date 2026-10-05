# Báo Cáo Bài Tập 4: Quản lý tệp tin bỏ qua (.gitignore) và Sửa lịch sử (Amend)

- **Môn học**: DevOps / Git Version Control
- **Mã bài tập**: Session 04 - Exercise 4 (ex4)
- **Công nghệ dự án**: HTML5 & Vanilla JavaScript
- **Học viên**: Longle183
- **Repository**: [https://github.com/Longle183/Session04_IT209_Ex4](https://github.com/Longle183/Session04_IT209_Ex4)

---

## 1. Mục tiêu bài tập

1. **Cấu hình tệp tin ẩn `.gitignore`**: Tự động bỏ qua các file nhạy cảm (`credentials.txt`, file môi trường, secret keys) và file rác của hệ thống/dự án JavaScript (`node_modules/`, `dist/`, `.DS_Store`).
2. **Gỡ bỏ file đã commit ra khỏi cache theo dõi của Git**: Sử dụng lệnh `git rm --cached` một cách an toàn mà không xóa tệp tin vật lý trên đĩa cứng.
3. **Chỉnh sửa commit gần nhất bằng tùy chọn `--amend`**: Loại bỏ file nhạy cảm ra khỏi commit ban đầu và cập nhật thông điệp commit sạch sẽ, an toàn.

---

## 2. Bối cảnh và Thách thức

- **Sự cố**: Trong quá trình phát triển ứng dụng Web (HTML & JavaScript), người lập trình vô tình dùng lệnh `git add .` và commit cả tệp tin bảo mật chứa thông tin nhạy cảm `credentials.txt` (Database password, API Secret key, v.v.) lên Git history.
- **Yêu cầu & Ràng buộc**:
  - Gỡ bỏ tệp tin này hoàn toàn khỏi sự theo dõi của Git.
  - **Tuyệt đối không xóa vật lý file trên hệ điều hành**: Tệp tin `credentials.txt` vẫn phải tồn tại nguyên vẹn trong thư mục làm việc cục bộ (Local Working Directory) để lập trình viên sử dụng kết nối API khi chạy trên máy cá nhân.
  - Cấu hình `.gitignore` để Git không bao giờ theo dõi lại tệp tin này trong tương lai.
  - Sửa lại commit gần nhất bằng `git commit --amend` để làm sạch lịch sử Git.

---

## 3. Quy trình thực hiện chi tiết

### Bước 1: Mô phỏng sự cố commit nhầm file nhạy cảm
Khởi tạo dự án gồm mã nguồn HTML (`index.html`), JavaScript (`app.js`) và tệp bảo mật `credentials.txt`:
```bash
git init
git add app.js index.html credentials.txt
git commit -m "feat: init web project with HTML, JS and credentials"
```
Kết quả commit ban đầu đã vô tình đưa `credentials.txt` vào Git tracking tree:
```text
[main (root-commit) a2a62a3] feat: init web project with HTML, JS and credentials
 3 files changed, 71 insertions(+)
 create mode 100644 app.js
 create mode 100644 credentials.txt
 create mode 100644 index.html
```

---

### Bước 2: Gỡ file khỏi cache Git bằng `git rm --cached`
Để đưa file ra khỏi sự quản lý của Git mà **không làm mất file vật lý trên ổ cứng**, sử dụng lệnh:
```bash
git rm --cached credentials.txt
```

> **Giải thích cơ chế hoạt động của `git rm --cached`:**
> - Lệnh `git rm <file>` thông thường sẽ thực hiện 2 thao tác: Xóa file khỏi Git Index (Staging Area) **và** xóa luôn tệp tin vật lý trên Working Directory.
> - Cờ `--cached` thông báo cho Git chỉ can thiệp vào tầng Index (bộ nhớ đệm theo dõi), đánh dấu file ở trạng thái `deleted` chuẩn bị commit, trong khi file vật lý trên đĩa cứng được giữ nguyên 100% không bị ảnh hưởng.
> - Sau lệnh này, file trở thành tệp **Untracked** đối với Git.

Kiểm tra trạng thái ngay sau lệnh:
```bash
git status
```
Output:
```text
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	deleted:    credentials.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	credentials.txt
```

---

### Bước 3: Cấu hình tệp tin `.gitignore`
Tạo file `.gitignore` để báo cho Git tự động bỏ qua `credentials.txt` cùng các tệp nhạy cảm và thư mục dự án Web:
```gitignore
# Sensitive and secret files
credentials.txt
*.env
*.key
*.pem

# Dependencies & build
node_modules/
dist/
.DS_Store
```

Đưa `.gitignore` vào Staging Area:
```bash
git add .gitignore
```

Kiểm tra lại `git status`:
```text
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   .gitignore
	deleted:    credentials.txt
```
*Lưu ý: Tệp `credentials.txt` đã biến mất hoàn toàn khỏi danh sách Untracked files vì đã được `.gitignore` nhận diện và bỏ qua.*

---

### Bước 4: Sửa lịch sử commit bằng tùy chọn `--amend`
Để gộp thay đổi (loại bỏ `credentials.txt`, thêm `.gitignore` và `README.md`) vào trực tiếp commit trước đó, đồng thời thay thế thông điệp commit sạch sẽ:
```bash
git add README.md
git commit --amend -m "feat: initialize web project source code (resolved credentials.txt)"
```

> **Giải thích cơ chế của `git commit --amend`:**
> - `git commit --amend` lấy toàn bộ nội dung đang staged trong Index và gộp vào commit gần nhất (HEAD).
> - Git tạo ra một commit SHA mới thay thế hoàn toàn commit cũ.
> - Kết quả: Tệp `credentials.txt` hoàn toàn bị xóa khỏi cây thư mục của commit đó, thông điệp commit được làm mới chuyên nghiệp và sạch sẽ.

---

## 4. Minh chứng kết quả thực tế (Verification)

### 4.1. Kiểm tra trạng thái Git (`git status`)
```bash
git status
```
**Kết quả hiển thị:**
```text
On branch main
nothing to commit, working tree clean
```
File `credentials.txt` không còn xuất hiện trong danh sách theo dõi của Git (không ở dạng Staged hay Modified).

Kiểm tra danh sách tệp bị bỏ qua:
```bash
git status --ignored
```
**Kết quả hiển thị:**
```text
On branch main
Ignored files:
  (use "git add -f <file>..." to include in what will be committed)
	credentials.txt

nothing to commit, working tree clean
```

---

### 4.2. Kiểm tra lịch sử commit gần nhất (`git log -n 1`)
```bash
git log -n 1
```
**Kết quả hiển thị:**
```text
commit 7056227cfb7519eb147e132b1f29a22567c53cf2 (HEAD -> main)
Author: Longle183 <lethanhlong1224@gmail.com>
Date:   Mon Oct 5 23:54:38 2026 +0700

    feat: initialize web project source code (resolved credentials.txt)
```
Thông điệp commit đã được cập nhật thành công, sạch sẽ, không còn nhắc đến tệp credentials.

Kiểm tra danh sách các file trong commit mới:
```bash
git show --name-status
```
**Kết quả:**
```text
A       .gitignore
A       README.md
A       app.js
A       index.html
```
*(Hoàn toàn không có sự xuất hiện của `credentials.txt` trong commit).*

---

### 4.3. Minh chứng tệp tin vật lý vẫn tồn tại trên đĩa cứng
Kiểm tra danh sách tệp tin trong thư mục làm việc:
```powershell
Get-ChildItem -Force
```
**Kết quả hiển thị:**
```text
Directory: C:\Users\acer\Desktop\PTIT\rikkei\Dev-ops\btvn\ss4\ex4

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d--h--         10/5/2026  11:54 PM                .git
-a----         10/5/2026  11:53 PM            117 .gitignore
-a----         10/5/2026  11:53 PM            405 app.js
-a----         10/5/2026  11:48 PM            148 credentials.txt
-a----         10/5/2026  11:53 PM           1711 index.html
-a----         10/5/2026  11:55 PM           8200 README.md
```
Tệp `credentials.txt` vẫn nằm nguyên vẹn tại thư mục cục bộ với dung lượng 148 bytes.

---

## 5. Kết luận & Best Practices

1. **Hiểu rõ tính chất của `.gitignore`**: Tệp `.gitignore` chỉ có tác dụng với các file **chưa từng được Git theo dõi (untracked)**. Đối với các file đã lỡ commit vào Git, bắt buộc phải dùng `git rm --cached <file>` trước khi đưa tên file vào `.gitignore`.
2. **Quy tắc an toàn khi dùng `--amend`**: Chỉ nên sử dụng `git commit --amend` với các commit cục bộ (Local commits) chưa push lên remote. Nếu commit đã được push lên Remote nhánh chung, việc amend sẽ viết lại lịch sử (cần push `--force`) và có thể gây xung đột với các thành viên khác trong team.
3. **Mẫu file an toàn cho môi trường**: Nên commit file mẫu cấu hình như `.env.example` (chỉ chứa tên biến mà không chứa giá trị mật khẩu) để đồng đội biết cấu trúc config mà không làm lộ bí mật bảo mật.
