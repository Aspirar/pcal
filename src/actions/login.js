const bcrypt = require("bcrypt");
const crypto = require("crypto");

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

module.exports = async (req, res) => {
  const user = await insertOrFetchUser(req);
  const token = await generateAndUpdateToken(req.model, user._id);
  res.json({ token });
};
