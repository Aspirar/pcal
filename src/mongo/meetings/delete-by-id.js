module.exports = ({ db }, id) => db.deleteOne({ _id: id });
