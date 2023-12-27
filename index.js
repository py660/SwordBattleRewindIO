const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/web/index.html');
});
app.get('/script.js', (req, res) => {
  res.sendFile(__dirname + '/web/script.js');
});
app.get('/favicon.png', (req, res) => {
  res.sendFile(__dirname + '/web/favicon.png');
});
app.get('/revs.txt', (req, res) => {
  res.sendFile(__dirname + '/revs.txt');
});

app.post('/rollback', (req, res) => {
  console.log(req.body.commit);
  fs.writeFileSync("wanted.txt", req.body.commit);
  res.send("<meta http-equiv='refresh' content='0; /waitforit'>Please reload, content may take a while to load...");
  console.log(":> Killing webserver...");
  process.exit();
})

app.listen(port, () => {
  console.log(`:> WebServer started @localhost:${port}`);
});