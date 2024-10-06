module.exports = async (req, res) => {
  await req.model.schedulers.insert({
    name: req.body.name,
    startTime: new Date(req.body.startTime),
    endTime: new Date(req.body.endTime),
    slotStartTime: req.body.slotStartTime,
    slotEndTime: req.body.slotEndTime,
    userId: req.userId,
  });
  res.json({ success: true });
};
