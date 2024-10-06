const { ObjectId } = require("mongodb");
const { TZDate } = require("@date-fns/tz");
const fns = require("date-fns");

const C = require("../constants");

function createTzDate(str, tz) {
  const dateObj = new Date(str);
  const year = dateObj.getUTCFullYear();
  const month = dateObj.getUTCMonth();
  const date = dateObj.getUTCDate();
  return new TZDate(year, month, date, tz);
}

async function fetchScheduler(req) {
  const schedulerId = ObjectId.createFromHexString(req.params.schedulerId);
  const scheduler = await req.model.schedulers.fetchById(schedulerId);
  scheduler.startTime = createTzDate(scheduler.startTime, scheduler.tz);
  scheduler.endTime = createTzDate(scheduler.endTime, scheduler.tz);
  return scheduler;
}

function isOverlap(start1, end1, start2, end2) {
  return fns.areIntervalsOverlapping(
    { start: start1, end: end1 },
    { start: start2, end: end2 },
  );
}

function getDayStart(startTime, scheduler) {
  const diff = Math.floor((startTime - scheduler.startTime) / C.time.ms.DAY);
  return fns.addDays(scheduler.startTime, diff);
}

function getNewConfig(day, config) {
  return {
    startTime: fns.addMilliseconds(day, config.slotStartTime),
    endTime: fns.addMilliseconds(day, config.slotEndTime),
  };
}

function toDate(tzDate) {
  return new Date(fns.getTime(tzDate));
}

module.exports = {
  createTzDate,
  fetchScheduler,
  isOverlap,
  getDayStart,
  getNewConfig,
  toDate,
};
