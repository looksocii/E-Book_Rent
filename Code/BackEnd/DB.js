const Pool = require("pg").Pool;

// set Config ต่างๆของ PostgreSQL
const pool = new Pool({
  user: "postgres",
  password: "528491",
  host: "localhost",
  port: 5432,
  database: "test"
});

module.exports = pool;