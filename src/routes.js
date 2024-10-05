const health = require("./actions/health");
const login = require("./actions/login");

module.exports = (app) => {
  app.get("/health", health);
  app.post("/login", login);
};
