module.exports = ({ db }) =>
  db.createIndex({ userId: 1, startTime: 1, endTime: 1 });
