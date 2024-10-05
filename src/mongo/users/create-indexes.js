module.exports = ({ db }) => db.createIndex({ username: 1 }, { unique: true });
