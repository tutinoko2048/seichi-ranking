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
const db = require('../db/index');

app.use(express.static('public'));

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
  
  db.pool.connect((err, client) => {
    if (err) {
      console.log(err);
    } else {
      client.query('SELECT player, mine, level FROM serverdata', (err, result) => {
        console.log(result);
      });
    }
  });
  
});

function getTime() {
  return moment().format('HH:mm:ss');
}
