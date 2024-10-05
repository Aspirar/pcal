const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function insertOrFetchUser(req) {
  return req.model.users.insertOrFetch({
    username: req.body.username,
    passwordHash: await bcrypt.hash(req.body.password, 10),
  });
}

function generateToken() {
  return crypto.randomBytes(24).toString("base64");
}

async function updateToken(model, userId, token) {
  model.users.updateToken({
    id: userId,
    tokenHash: await bcrypt.hash(token, 8),
  });
}

async function generateAndUpdateToken(model, userId) {
  const token = generateToken();
  await updateToken(model, userId, token);
  return `${userId}-${token}`;
}

module.exports = async (req, res) => {
  const user = await insertOrFetchUser(req);
  const token = await generateAndUpdateToken(req.model, user._id);
  res.json({ token });
};
