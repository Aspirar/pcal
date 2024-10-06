module.exports = ({ db }, payload) =>
  db
    .find({
      userId: payload.userId,
      ...(payload.after && { _id: { $gt: payload.after } }),
    })
    .limit(10)
    .toArray();
