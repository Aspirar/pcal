const fns = require("date-fns");
const { TZDate } = require("@date-fns/tz");

const date = new Date("2024-10-06");
console.log(date, typeof date);
const td = new TZDate(date, "Asia/Kolkata");
for (const key of Object.keys(td)) console.log(key);
const td2 = fns.addHours(td, 10);
console.log(td, td2, td < td2, td2 < td, new Date(td.toISOString()));
