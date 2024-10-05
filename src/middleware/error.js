const { UserError } = require("../errors");

module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (err instanceof UserError)
    res.status(err.code).json({ error: err.message });
  else {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
};
