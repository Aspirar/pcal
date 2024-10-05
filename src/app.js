const express = require("express");
require("express-async-errors");

const conf = require("./conf");
const authMiddleware = require("./middleware/auth");
const errorMiddleware = require("./middleware/error");
const reqMiddleware = require("./middleware/req");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(reqMiddleware);
routes.applyRoutes(app);
app.use(authMiddleware);
routes.applyAuthenticatedRoutes(app);
app.use(errorMiddleware);

app.listen(conf.port, () => {
  console.log(`Listening on ${conf.port}`);
});
