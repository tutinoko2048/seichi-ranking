const express = require('express');
const app = express();
const Websocket = require('ws');
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("listening:" + server.address().port);
});
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { 
        sslmode: 'require',
        rejectUnauthorized: false
    }
});

app.get("/", (req, res, next) => {
  console.log('get');
  pool.query('SELECT * FROM serverdata', (err, result) => {
    if (err) {
      console.error(err);
      res.json({error: err.message})
    } else {
      console.log(result);
      res.send(`<span style="font-family:"Helvetica";">Data:<br>${JSON.stringify(result.rows, null, 2).replace('\n', '<br>').replace(' ', '&nbsp;')}</span>`);
    }
  });
});

function getTime() {
  return moment().format('HH:mm:ss');
}
