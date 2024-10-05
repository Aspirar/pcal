module.exports = ({ db }, payload) =>
  db.updateOne({ _id: payload.id }, { $set: { sidHash: payload.sidHash } });
