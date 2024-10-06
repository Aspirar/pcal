module.exports = ({ db }, payload) =>
  db
    .find({
      userId: payload.userId,
      startTime: { $lte: payload.endTime },
      endTime: { $gte: payload.startTime },
    })
    .sort({ startTime: 1, endTime: 1 })
    .toArray();
