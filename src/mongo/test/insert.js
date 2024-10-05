module.exports = (db, payload) =>
  db.insertOne({
    key: payload.key,
    value: payload.value,
  });
