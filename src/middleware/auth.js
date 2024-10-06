const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const { AuthenticationError } = require("../errors");

function splitToken(token) {
  const [userId, sid] = token.split("-");
  return {
    userId: ObjectId.createFromHexString(userId),
    sid,
  };
}

module.exports = async (req, res, next) => {
  const token = req.headers.authorization || req.cookies.token;
  if (!token) return next();

  const { userId, sid } = splitToken(token);
  const user = await req.model.users.fetchSid(userId);
  if (await bcrypt.compare(sid, user.sidHash)) req.userId = userId;

  next();
};
