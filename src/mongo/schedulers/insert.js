module.exports = ({ db }, payload) =>
  db.insertOne({
    startTime: payload.startTime,
    endTime: payload.endTime,
    name: payload.name,
    slotStartTime: payload.slotStartTime,
    slotEndTime: payload.slotEndTime,
    userId: payload.userId,
  });
