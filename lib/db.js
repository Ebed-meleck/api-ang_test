const mysql = require("mysql");
require("dotenv").config();
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
function query(request, parameters) {
  return new Promise((resolve, reject) => {
    pool.query(request, parameters, (error, results, fiedls) => {
      if (error) reject(error);
      resolve(results);
    });
  });
}
module.exports.query = query;
