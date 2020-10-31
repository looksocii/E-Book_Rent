const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./DB");

app.use(cors());
app.use(express.json());

app.get("/booklist", async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    const allTodos = await pool.query("SELECT * FROM booklist");
    res.json(allTodos.rows);
    console.log(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});