module.exports = async ({ db }, payload) => {
  const toInsert = {
    username: payload.username,
    passwordHash: payload.passwordHash,
  };
  const response = await db.insertOne(toInsert);
  return { _id: response.insertedId };
};
