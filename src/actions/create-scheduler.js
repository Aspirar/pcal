const { TZDate } = require("@date-fns/tz");

module.exports = async (req, res) => {
  const tz = req.body.tz;
  await req.model.schedulers.insert({
    name: req.body.name,
    startTime: new TZDate(req.body.startTime, tz).internal,
    endTime: new TZDate(req.body.endTime, tz).internal,
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
