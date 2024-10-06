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

function getStartAndEndTime(req) {
  const startTime = createTzDate(req.query.startDate, req.query.tz);
  const endTime = fns.addDays(startTime, 1);
  return { startTime, endTime };
}

function isOverlap(start1, end1, start2, end2) {
  return fns.areIntervalsOverlapping(
    { start: start1, end: end1 },
    { start: start2, end: end2 },
  );
}

function getDayStart(startTime, scheduler) {
  const diff = Math.floor(
    (startTime.internal - scheduler.startTime) / C.time.ms.DAY,
  );
  return fns.addDays(scheduler.startTime, diff);
}

function fillConfigSlots(scheduler, config, startTime, endTime) {
  const slots = [];
  for (
    let slotStart = fns.max([config.startTime, startTime]);
    fns.isBefore(slotStart, fns.min([config.endTime, endTime]));
    slotStart = fns.addMilliseconds(slotStart, scheduler.stride)
  ) {
    const slotEnd = fns.addMilliseconds(slotStart, scheduler.duration);
    if (fns.isAfter(slotEnd, config.endTime)) break;
    slots.push({ start: slotStart, end: slotEnd });
  }
  return slots;
}

function computeSlotsForConfig(scheduler, day, config, startTime, endTime) {
  const newConfig = {
    startTime: fns.addMilliseconds(day, config.slotStartTime),
    endTime: fns.addMilliseconds(day, config.slotEndTime),
  };
  if (!isOverlap(newConfig.startTime, newConfig.endTime, startTime, endTime))
    return [];
  return fillConfigSlots(scheduler, newConfig, startTime, endTime);
}

function iterateDayConfigs(scheduler, day, configs, startTime, endTime) {
  return configs.flatMap((config) =>
    computeSlotsForConfig(scheduler, day, config, startTime, endTime),
  );
}

function iterateDays(startTime, endTime, scheduler) {
  const slots = [];
  for (
    let day = getDayStart(startTime, scheduler);
    fns.isBefore(day, endTime);
    day = fns.addDays(day, 1)
  ) {
    const configs = scheduler.configs[fns.getDay(day)];
    if (!configs?.length) continue;
    slots.push(iterateDayConfigs(scheduler, day, configs, startTime, endTime));
  }
  return slots.flat();
}

function computeSlots(scheduler, startTime, endTime) {
  if (!isOverlap(scheduler.startTime, scheduler.endTime, startTime, endTime))
    return [];
  return iterateDays(startTime, endTime, scheduler);
}

function toDate(tzDate) {
  return new Date(fns.getTime(tzDate));
}

function fetchMeetings(slots, req) {
  if (!slots.length) return [];
  const startTime = toDate(slots[0].start);
  const endTime = toDate(slots[slots.length - 1].endTime);
  return req.model.meetings.fetchByTimeRange({
    userId: req.userId,
    startTime,
    endTime,
  });
}

function isAfterOrEqual(date, toCompare) {
  return fns.isAfter(date, toCompare) || fns.isEqual(date, toCompare);
}

function isBeforeOrEqual(date, toCompare) {
  return fns.isBefore(date, toCompare) || fns.isEqual(date, toCompare);
}

function filterSlots(slots, meetings) {
  let i = 0;
  let j = 0;
  const filtered = [];
  while (i < slots.length && j < meetings.length) {
    if (isAfterOrEqual(slots[i].start, meetings[j].endTime)) j += 1;
    else if (isBeforeOrEqual(slots[i].end, meetings[j].startTime)) {
      filtered.push(slots[i]);
      i += 1;
    } else i += 1;
  }
  return [...filtered, ...slots.slice(i)];
}

async function fetchMeetingsAndFilterSlots(slots, req) {
  const meetings = await fetchMeetings(slots, req);
  return filterSlots(slots, meetings);
}

async function getFinalSlots(scheduler, startTime, endTime, req) {
  const slots = computeSlots(scheduler, startTime, endTime);
  const filteredSlots = await fetchMeetingsAndFilterSlots(slots, req);
  return filteredSlots;
}

module.exports = async (req, res) => {
  const scheduler = await fetchScheduler(req);
  const { startTime, endTime } = getStartAndEndTime(req);
  const slots = await getFinalSlots(scheduler, startTime, endTime, req);
  res.json({ slots });
};
