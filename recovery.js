const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/web/recovery.html');
});

app.get('/output.log', (req, res) => {
  res.sendFile(__dirname + '/output.log');
});

app.get('/wanted.txt', (req, res) => {
  res.sendFile(__dirname + '/wanted.txt');
});

app.post('/reset', (req, res) => {
  res.send("<meta http-equiv='refresh' content='0; /'>Exiting...");
  process.exit();
})

app.listen(port, () => {
  console.log(`:> Recovery WebServer started @localhost:${port}`);
});