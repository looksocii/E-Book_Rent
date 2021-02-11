
## ขั้นตอน set ค่าต่างๆ
1) Carete DataBase iBook และสร้าง Table ตามไฟล์ Blackend/SQL/iBook.sql ลงบน PostgreSQL (pg admin)
2) set DataBase (PostgreSQL) ที่ไฟล์ Blackend/DB.js
3) set IP ของอินเตอร์เน็ตที่เชื่อมต่ออยู่ ที่ไฟล์ iBook/IPconfig.js
    3.1) วิธีการดู IP ของอินเตอร์เน็ตที่เชื่อมต่ออยู่ มีดังนี้
        - เปิด cmd ขึ้นมาแล้วใส่คำสั่ง ipconfig กด enter ให้มองหาหัวข้อ IPv4 Address
        - ดู IP ได้ที่หน้า Metro Bundler หลังรันโปรเจค iBook (expo)

## ขั้นตอนรันโปรเจค
1) ใน Terminal ที่ 1 cd Blackend => npm install => npm start
2) ใน Terminal ที่ 2 cd iBook => npm install => npm start
3) หน้า Metro Bundler ของแอพ iBook จะเด้่งขึ้นเมื่อรันเสร็จ
4) ให้เลือก CONNECTION เป็น "LAN" => สแกน QRcode บน โทรศัพท์ => ลองสมัครใช้งาน => ถ้าสมัครได้จะเด้งไปหน้า SingIn => เสร็จ

### หมายเหตุ : เครื่องคอมที่รันโปรเจค expo จะต้องเชื่อม wifi เดียวกันกับโทรศัพท์ที่ใช้เปิดโปรเจค
### แนะนำให้ใช้โทรศัพท์ iPhone11 ในการเปิดโปรเจค หรือ iPad ที่มีจอขนาดใหญ่
