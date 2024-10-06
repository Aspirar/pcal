const { ObjectId } = require("mongodb");

const C = require("../constants");

function computeSlots(scheduler, startTime, endTime) {
  if (startTime >= scheduler.endTime || endTime <= scheduler.startTime)
    return [];
  const dayDiff = Math.floor((startTime - scheduler.startTime) / C.time.ms.DAY);
  let dayStart = new Date(
    scheduler.startTime.getTime() + C.time.ms.DAY * dayDiff,
  );
  const slots = [];
  while (dayStart < endTime) {
    const slotStartTime = new Date(
      dayStart.getTime() + scheduler.slotStartTime,
    );
    const slotEndTime = new Date(dayStart.getTime() + scheduler.slotEndTime);
    if (slotStartTime >= endTime || slotEndTime <= startTime) {
      dayStart = new Date(dayStart.getTime() + C.time.ms.DAY);
      continue;
    }
    let slotStart = slotStartTime;
    if (startTime > slotStartTime) {
      const slotDiff = Math.ceil((startTime - slotStartTime) / C.time.ms.HOUR);
      slotStart = slotStartTime + slotDiff * C.time.ms.HOUR;
    }
    while (slotStart < endTime && slotStart < slotEndTime) {
      slots.push(slotStart);
      slotStart = new Date(slotStart.getTime() + C.time.ms.HOUR);
    }
    dayStart = new Date(dayStart.getTime() + C.time.ms.DAY);
  }
  return slots;
}

async function filterSlots(slots, req) {
  if (!slots.length) return slots;
  const startTime = slots[0];
  const endTime = new Date(slots[slots.length - 1].getTime() + C.time.ms.HOUR);
  const meetings = await req.model.meetings.fetchByTimeRange({
    userId: req.userId,
    startTime,
    endTime,
  });
  let i = 0;
  let j = 0;
  const filteredSlots = [];
  while (i < slots.length && j < meetings.length) {
    const slotEnd = new Date(slots[i].getTime() + C.time.ms.HOUR);
    if (slotEnd <= meetings[j].startTime) {
      filteredSlots.push(slots[i]);
      i += 1;
    } else if (slots[i] >= meetings[j].endTime) {
      j += 1;
    } else {
      i += 1;
    }
  }
  while (i < slots.length) {
    filteredSlots.push(slots[i]);
    i += 1;
  }
  return filteredSlots;
}

module.exports = async (req, res) => {
  const schedulerId = ObjectId.createFromHexString(req.params.schedulerId);
  const scheduler = await req.model.schedulers.fetchById(schedulerId);
  const startTime = new Date(req.query.startTime);
  const endTime = new Date(startTime.getTime() + C.time.ms.DAY);
  const slots = computeSlots(scheduler, startTime, endTime);
  const filteredSlots = await filterSlots(slots, req);
  res.json({ slots: filteredSlots });
};
