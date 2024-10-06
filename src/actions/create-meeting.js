const { ObjectId } = require("mongodb");

const C = require("../constants");

module.exports = async (req, res) => {
  const schedulerId = ObjectId.createFromHexString(req.params.schedulerId);
  const scheduler = await req.model.schedulers.fetchById(schedulerId);
  const startTime = new Date(req.body.startTime);
  const endTime = new Date(startTime.getTime() + C.time.ms.HOUR);
  if (startTime >= scheduler.endTime || endTime <= scheduler.startTime) {
    res.json({ success: false });
    return;
  }
  const dayDiff = Math.floor((startTime - scheduler.startTime) / C.time.ms.DAY);
  const day = new Date(scheduler.startTime.getTime() + dayDiff * C.time.ms.DAY);
  const slotStartTime = new Date(day.getTime() + scheduler.slotStartTime);
  const slotEndTime = new Date(day.getTime() + scheduler.slotEndTime);
  if (startTime >= slotEndTime || endTime <= slotStartTime) {
    res.json({ success: false });
    return;
  }

  if ((startTime - slotStartTime) % C.time.ms.HOUR !== 0) {
    res.json({ success: false });
    return;
  }

  const conflicts = await req.model.meetings.fetchByTimeRange({
    userId: req.userId,
    startTime,
    endTime,
  });
  console.log(conflicts);
  if (conflicts.length) {
    res.json({ success: false });
    return;
  }

  await req.model.meetings.insert({
    schedulerId,
    startTime,
    endTime,
    email: req.body.email,
    userId: req.userId,
  });

  res.json({ success: true });
};
