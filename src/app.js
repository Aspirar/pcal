const express = require("express");

const conf = require("./conf");
const reqMiddleware = require("./middleware/req");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(reqMiddleware);
routes(app);

app.listen(conf.port, () => {
  console.log(`Listening on ${conf.port}`);
});
