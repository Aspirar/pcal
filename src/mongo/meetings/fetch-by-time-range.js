module.exports = ({ db }, payload) =>
  db
    .find({
      userId: payload.userId,
      startTime: { $lt: payload.endTime },
      endTime: { $gt: payload.startTime },
    })
    .sort({ startTime: 1, endTime: 1 })
    .toArray();
