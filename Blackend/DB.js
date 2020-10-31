const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "528491",
  host: "localhost",
  port: 5432,
  database: "iBook"
});

module.exports = pool;