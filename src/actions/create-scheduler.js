module.exports = async (req, res) => {
  await req.model.schedulers.insert({
    name: req.body.name,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    userId: req.userId,
    startBuffer: req.body.startBuffer,
    endBuffer: req.body.endBuffer,
    notice: req.body.notice,
    duration: req.body.duration,
    stride: req.body.stride,
    configs: req.body.configs,
    tz: req.body.tz,
  });
  res.json({ success: true });
};
