# Huong Dan Demo Seminar Jenkins

Tai lieu nay dung de chay live demo trong buoi seminar Jenkins co ban. Muc tieu la cho moi nguoi thay ro cung mot bai toan sau khi merge code, nhung cach lam thu cong va cach lam bang Jenkins khac nhau nhu the nao.

## Chuan bi truoc buoi demo

- Mo san 3 cua so:
  - Trinh duyet dang mo app demo
  - Editor dang mo source code
  - Terminal de git, ssh, va chay lenh
- Neu demo Jenkins:
  - Mo san trang Jenkins
  - Dam bao pipeline da pass it nhat 1 lan truoc buoi demo
- Chon 2 thay doi rat nho, de nhin thay ngay tren giao dien
- Uu tien thay doi text, label, heading, hoac mot badge nho

## Phan 1: Demo Thu Cong

### Muc tieu

Cho moi nguoi thay rang sau khi merge code, neu chua co Jenkins thi van phai co nguoi vao server va tu chay tung buoc ky thuat de moi truong nhan ban moi.

### Cac buoc thuc hien

1. Mo app dang chay tren moi truong demo.
2. Chi cho moi nguoi trang thai hien tai cua app.
3. Mo code o nhanh `dev`.
4. Tao mot thay doi nho, de nhin thay ngay tren giao dien.
5. Commit thay doi do vao `dev`.
6. Merge `dev` vao `main`.
7. Noi ro la code o `main` da moi, nhung app dang chay van chua doi.
8. SSH vao server dang chay app.
9. Vao thu muc project tren server.
10. Chay pull code tu `main`.
11. Chay cai dependency neu can.
12. Chay build ung dung.
13. Restart app hoac service.
14. Kiem tra log hoac kiem tra app local tren server.
15. Quay lai trinh duyet, refresh app.
16. Chi cho moi nguoi thay doi moi da xuat hien.
17. Chot y: de dua mot thay doi nho len moi truong chay ma van phai qua ca chuoi thao tac tay.

### Loi thoai goi y

- "Bay gio code da vao nhanh main roi, nhung app dang chay van chua tu nhan ban moi."
- "Neu chua co Jenkins, tu thoi diem merge code den luc moi truong nhan ban moi van la mot chuoi thao tac tay."
- "Bay gio em vao server va chay tung buoc mot de dua thay doi nay len moi truong."
- "Moi nguoi co the thay la chi de dua mot thay doi rat nho len app ma van phai pull code, build, restart, va kiem tra lai."

### Vi du lenh thu cong

Neu app demo la Next.js:

```bash
cd /opt/apps/jenkins-basic
git pull origin main
npm install
npm run build
pm2 restart jenkins-basic
pm2 logs jenkins-basic --lines 20
```

Neu muon minh hoa du an phuc tap hon, co the noi them ve case Laravel:

```bash
ssh ubuntu@staging-server
cd /var/www/laravel-app
git pull origin main
composer install --no-interaction --prefer-dist --optimize-autoloader
php artisan down
php artisan migrate --force
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
npm install
npm run build
php artisan queue:restart
sudo systemctl restart php8.2-fpm
sudo systemctl reload nginx
php artisan up
tail -n 50 storage/logs/laravel.log
curl -I https://staging.example.com
```

### Y can chot sau phan 1

- Code merge xong chua dong nghia la moi truong da nhan ban moi.
- Van can mot nguoi dung ra thuc hien chuoi thao tac ky thuat.
- Cang nhieu buoc, cang de quen, de sai, va de fail.

## Phan 2: Demo Jenkins

### Muc tieu

Cho moi nguoi thay cung mot bai toan do, nhung lan nay Jenkins thay con nguoi chay chuoi thao tac lap di lap lai sau khi code thay doi.

### Cac buoc thuc hien

1. Quay lai code o nhanh `dev`.
2. Tao them mot thay doi nho nua, van de nhin thay ngay tren giao dien.
3. Commit thay doi do vao `dev`.
4. Merge tiep `dev` vao `main`.
5. Nhan manh la lan nay se khong SSH chay tay nua.
6. Mo Jenkins.
7. Vao job hoac pipeline da chuan bi san.
8. Chi nhanh cho moi nguoi thay ten pipeline va cac stage chinh.
9. Bam `Build Now` hoac chay pipeline.
10. Mo `Console Output`.
11. Chi cho moi nguoi thay Jenkins dang chay cac buoc tuong ung: checkout, install, build, deploy hoac restart, smoke check.
12. Doi pipeline pass.
13. Quay lai trinh duyet, refresh app.
14. Chi cho moi nguoi thay thay doi thu hai da xuat hien.
15. Chot y: cung mot muc tieu, nhung lan nay Jenkins lam thay chuoi thao tac lap lai.

### Loi thoai goi y

- "Lan nay em khong vao server de chay tung lenh nua."
- "Thay vao do, em vao Jenkins va chay pipeline da duoc dinh nghia san."
- "Moi nguoi co the nhin console log va thay Jenkins dang lam dung nhung gi luc nay con nguoi vua phai tu lam."
- "Khac biet lon nhat la chuoi buoc nay da duoc chuan hoa, co log, co lich su, va chay lai theo cung mot cach."

### Vi du cac buoc Jenkins se chay

```bash
git checkout main
npm install
npm run build
pm2 restart jenkins-basic
curl -I http://staging-app
```

### Y can chot sau phan 2

- Jenkins khong thay cong viec nghiep vu.
- Jenkins thay phan viec ky thuat lap di lap lai sau khi code thay doi.
- Gia tri lon nhat o muc co ban la nhanh hon, on dinh hon, minh bach hon.

## Chuyen canh giua 2 phan

Co the noi mot cau rat ngan:

"Phan dau cho thay pain point. Phan sau cho thay Jenkins giai pain point do nhu the nao."

## Thu tu thao tac tot nhat trong buoi demo

1. Mo app truoc
2. Sua code sau
3. Merge xong moi xu ly release
4. O phan thu cong thi SSH va chay lenh
5. O phan Jenkins thi chi vao Jenkins va chay pipeline
6. Lan nao cung ket thuc bang refresh app

## Muc tieu cuoi cung cua buoi demo

Thong diep can de moi nguoi nho duoc:

- Khong co Jenkins: sau khi merge, con nguoi phai tu lam cac buoc release
- Co Jenkins: cac buoc do tro thanh mot workflow tu dong, co log, co lich su, va de lap lai hon

