const cookieParser = require("cookie-parser");
const express = require("express");
require("express-async-errors");

const conf = require("./conf");
const authMiddleware = require("./middleware/auth");
const errorMiddleware = require("./middleware/error");
const reqMiddleware = require("./middleware/req");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(reqMiddleware);
app.use(routes.viewsRouter);
app.use("/api", routes.router);
app.use("/api", authMiddleware, routes.authenticatedRouter);
app.use(errorMiddleware);

app.listen(conf.port, () => {
  console.log(`Listening on ${conf.port}`);
});
