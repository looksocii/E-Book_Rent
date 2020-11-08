ขั้นตอน set ค่าต่างๆ
1) Carete DataBase iBook และสร้าง Table ตามไฟล์ Blackend/SQL/iBook.sql ลงบน PostgreSQL (pg admin)
2) set DataBase (PostgreSQL) ที่ไฟล์ Blackend/DB.js
3) set IP ของอินเตอร์เน็ตที่เชื่อมต่ออยู่ ที่ไฟล์ iBook/IPconfig.js

ขั้นตอนรันโปรเจค
1) ใน Terminal ที่ 1 cd Blackend => npm start
2) ใน Terminal ที่ 2 cd iBook => npm install => npm start
3) รันผ่านบนเว็บไซด์ => ลองสมัครใช้งาน => ถ้าสมัครได้จะเด้งไปหน้า SingIn