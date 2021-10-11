const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const pool = require("./DB");

app.use(cors());
app.use(express.json());

const options = {
	definition: {
		info: {
			title: "Appication iBook APIs",
			version: "1.0.0",
			description: "A simple APIs with pgAdmin",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["index.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


// Code สร้าง Api เพื่อยิง require ไปให้ React Native ใช้งานได้

// ดึงข้อมูลประเภทหนังสือทั้งหมด
app.get("/category", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT content, COUNT(book_id) FROM category RIGHT JOIN booklist ON category.id = booklist.category_id GROUP BY category.content;");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

 /**
  * @swagger
  * tags:
  *   name: iBook App
  *   description: iBook Using JS
  */

/**
 * @swagger
 * /mybooks:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
// ดึงข้อมูลหนังสือทั้งหมดที่ join กับข้อมูลประเภทหนังสือ
app.get("/mybooks", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM booklist INNER JOIN category ON booklist.category_id=category.id;");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// ดึงข้อมูลของผู้ใช้งานทั้งหมด
app.get("/useraccount", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM useraccount");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// Done

/**
 * @swagger
 * /book/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: int
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         contens:
 *           application/json:
 *       404:
 *         description: The book was not found
 */
// ดึงประวัติการเช่ายืมหนังสือทั้งหมดของ user ที่ระบุ id user
app.get("/book/:id", async (req, res) => {
  try {
    console.log("SELECT * FROM booklist where id = " + req.params.id + ";");
    const allTodos = await pool.query("SELECT * FROM booklist where id = " + req.params.id + ";");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/getmybooks", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM (SELECT * FROM payment where useraccount_id = " + req.body.id_user + ") as useraccount join booklist on useraccount.booklist_id = booklist.book_id;");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// เพิ่มข้อมูลผู้ใช้ใหม่หรือที่สมัครเข้ามาใหม่
app.post('/signup', async (req, res) => {
  let num = Math.random()
  let id = (num * 1000).toFixed(0);
  let sql = "INSERT INTO useraccount (id, username, firstname, lastname, email, phone, password)";
  let values = "VALUES (" + id + ", '" + req.body.username + "', '" + req.body.firstname + "', '" + req.body.lastname + "', '" + req.body.email + "', '" + req.body.phone + "', '" + req.body.password + "')";
  let query = await pool.query(sql + values, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
});

// เพิ่มข้อมูลชำระเงินของ user ที่จ่ายเงินเช่ายืมหนังสือ
app.post('/rentbook', async (req, res) => {
  let num = Math.random()
  let id = (num * 1000).toFixed(0);
  let sql = "INSERT INTO payment (id, date_time, exp_date, total_price, useraccount_id, booklist_id)";
  let values = "VALUES (" + id + ", '" + req.body.date_time + "', '" + req.body.exp_date + "', '" + req.body.total_price + "', '" + req.body.useraccount_id + "', " + req.body.booklist_id + ")";
  let query = await pool.query(sql + values, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});