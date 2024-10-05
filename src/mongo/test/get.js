module.exports = (db) => db.find({}).limit(5).toArray();
