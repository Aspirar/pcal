module.exports = ({ db }, payload) =>
  db
    .find({
      userId: payload.userId,
      ...(payload.after && { _id: { $gt: payload.after } }),
    })
    .project({ _id: 1, name: 1 })
    .limit(10)
    .toArray();
