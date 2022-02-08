const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("listening:" + server.address().port);
});
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.use(express.static('public'));
const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
  console.log('get');
  pool.query('SELECT * FROM serverdata', (err, result) => {
    console.error(err);
    console.log(result);
  });
});
pool.query('SELECT * FROM serverdata', (err, result) => {
    console.error(err);
    console.log(result);
  });
function getTime() {
  return moment().format('HH:mm:ss');
}
