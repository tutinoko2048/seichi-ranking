const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("listening:" + server.address().port);
});
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo');

app.use(express.static('public'));

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
});

function getTime() {
  return moment().format('HH:mm:ss');
}
