const express = require("express");

const conf = require("./conf");

const app = express();

app.use((req, res) => {
  res.json({ success: true });
});

app.listen(conf.port, () => {
  console.log(`Listening on ${conf.port}`);
});
