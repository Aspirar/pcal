const bcrypt = require("bcrypt");
const crypto = require("crypto");

const C = require("../constants");
const { AuthenticationError } = require("../errors");

async function insertOrFetchUser(req) {
  return req.model.users.insertOrFetch({
    username: req.body.username,
    passwordHash: await bcrypt.hash(req.body.password, 10),
  });
}

function generateSid() {
  return crypto.randomBytes(24).toString("base64");
}

async function updateSid(model, userId, sid) {
  model.users.updateSid({
    id: userId,
    sidHash: await bcrypt.hash(sid, 8),
  });
}

async function generateAndUpdateToken(model, userId) {
  const sid = generateSid();
  await updateSid(model, userId, sid);
  return `${userId}-${sid}`;
}

function setTokenInCookie(token, res) {
  res.cookie(C.cookies.TOKEN, token, {
    httpOnly: true,
    maxAge: C.time.ms.DAY * 7,
  });
}

module.exports = async (req, res) => {
  const user = await insertOrFetchUser(req);
  if (!(await bcrypt.compare(req.body.password, user.passwordHash)))
    throw new AuthenticationError();
  const token = await generateAndUpdateToken(req.model, user._id);
  setTokenInCookie(token, res);
  res.json({ token });
};
