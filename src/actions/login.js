const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { username, password } = req.body;
  const user = await req.model.users.insertOrFetch({
    username,
    passwordHash: await bcrypt.hash(password, 10),
  });
  res.json(user);
};
