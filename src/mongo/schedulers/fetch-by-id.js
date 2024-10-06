module.exports = ({ db }, id) => db.findOne({ _id: id });
