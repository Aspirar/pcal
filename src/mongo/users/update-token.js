module.exports = ({ db }, payload) =>
  db.updateOne({ _id: payload.id }, { $set: { tokenHash: payload.tokenHash } });
