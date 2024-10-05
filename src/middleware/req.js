const { model } = require("../conn/mongo");

module.exports = (req, res, next) => {
  req.model = model;
  next();
};
