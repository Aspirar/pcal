const C = require("../../constants");

module.exports = async ({ model }, payload) => {
  try {
    const response = await model.insert(payload);
    return response;
  } catch (err) {
    if (err.code !== C.mongo.errors.DUPLICATE_KEY) throw err;
    return model.fetchByUsername(payload.username);
  }
};
