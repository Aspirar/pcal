const health = require("./actions/health");
const login = require("./actions/login");
const test = require("./actions/test");

module.exports = {
  applyRoutes(app) {
    app.get("/health", health);
    app.post("/login", login);
  },

  applyAuthenticatedRoutes(app) {
    app.get("/test", test);
  },
};
