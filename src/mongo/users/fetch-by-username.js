module.exports = ({ db }, username) =>
  db.findOne({ username }, { projection: { _id: 1, passwordHash: 1 } });
