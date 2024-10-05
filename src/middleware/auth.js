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
  const token = req.headers.authorization;
  if (!token) throw new AuthenticationError();

  const { userId, sid } = splitToken(token);
  const user = await req.model.users.fetchSid(userId);
  if (!(await bcrypt.compare(sid, user.sidHash)))
    throw new AuthenticationError();

  next();
};
