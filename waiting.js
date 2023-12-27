const express = require('express');
const fs = require('fs');

const app = express();
const port = 4000;

app.get('/waitforit', (req, res) => {
  res.sendFile(__dirname + '/web/waitforit.html');
});
app.get('/', (req, res) => {
  console.log("Wait for it...")
});
app.get('/wbrb.gif', (req, res) => {
  res.sendFile(__dirname + '/web/wbrb.gif');
});
app.get('/loading.mp4', (req, res) => {
  res.sendFile(__dirname + '/web/loading.mp4');
});
app.get('/favicon.png', (req, res) => {
  res.sendFile(__dirname + '/web/favicon.png');
});

app.listen(port, () => {
  console.log(`:> WaitForIt WebServer started @localhost:${port}`);
});