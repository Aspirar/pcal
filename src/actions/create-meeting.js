const fns = require("date-fns");

const {
  fetchScheduler,
  isOverlap,
  getDayStart,
  getNewConfig,
  toDate,
} = require("../lib/core");

function getStartAndEndTime(req, scheduler) {
  const startTime = new Date(req.body.startTime);
  const endTime = fns.addMilliseconds(startTime, scheduler.duration);
  return { startTime, endTime };
}

function isTimeRangeValid(scheduler, startTime, endTime) {
  return isOverlap(scheduler.startTime, scheduler.endTime, startTime, endTime);
}

function isConfigValid(day, config, startTime, endTime, scheduler) {
  const newConfig = getNewConfig(day, config);
  if (!isOverlap(newConfig.startTime, newConfig.endTime, startTime, endTime))
    return false;
  return (startTime - newConfig.startTime) % scheduler.stride === 0;
}

function isDayValid(startTime, endTime, scheduler) {
  const day = getDayStart(startTime, scheduler);
  const configs = scheduler.configs[fns.getDay(day)];
  if (!configs?.length) return false;
  return configs.some((config) =>
    isConfigValid(day, config, startTime, endTime, scheduler),
  );
}
function fetchConflicts(scheduler, req, startTime, endTime) {
  return req.model.meetings.fetchByTimeRange({
    userId: scheduler.userId,
    startTime: toDate(startTime),
    endTime: toDate(endTime),
  });
}

async function isFreeOfConflicts(scheduler, req, startTime, endTime) {
  const conflicts = await fetchConflicts(scheduler, req, startTime, endTime);
  return conflicts.length === 0;
}

async function isSlotValid(startTime, endTime, scheduler, req) {
  return (
    isTimeRangeValid(scheduler, startTime, endTime) &&
    isDayValid(startTime, endTime, scheduler) &&
    (await isFreeOfConflicts(scheduler, req, startTime, endTime))
  );
}

function insertMeeting(req, scheduler, startTime, endTime) {
  return req.model.meetings.insert({
    schedulerId: scheduler._id,
    startTime: toDate(startTime),
    endTime: toDate(endTime),
    email: req.body.email,
    userId: scheduler.userId,
  });
}

module.exports = async (req, res) => {
  const scheduler = await fetchScheduler(req);
  const { startTime, endTime } = getStartAndEndTime(req, scheduler);
  if (!(await isSlotValid(startTime, endTime, scheduler, req)))
    return res.json({ success: false });
  await insertMeeting(req, scheduler, startTime, endTime);
  res.json({ success: true });
};
