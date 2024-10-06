module.exports = ({ db }, payload) =>
  db.insertOne({
    startTime: payload.startTime,
    endTime: payload.endTime,
    name: payload.name,
    userId: payload.userId,
    startBuffer: payload.startBuffer,
    endBuffer: payload.endBuffer,
    notice: payload.notice,
    duration: payload.duration,
    stride: payload.stride,
    tz: payload.tz,
    configs: payload.configs,
  });
