module.exports = ({ db }, userId) =>
  db.findOne({ _id: userId }, { projection: { _id: 0, sidHash: 1 } });
