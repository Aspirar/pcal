module.exports = ({ db }, payload) =>
  db.insertOne({
    schedulerId: payload.schedulerId,
    startTime: payload.startTime,
    endTime: payload.endTime,
    email: payload.email,
    userId: payload.userId,
  });
