const { ObjectId } = require("mongodb");

module.exports = async (req, res) => {
  const id = ObjectId.createFromHexString(req.params.meetingId);
  await req.model.meetings.deleteById(id);
  res.json({ success: true });
};
