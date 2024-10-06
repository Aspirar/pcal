const fns = require("date-fns");
const { TZDate, tz } = require("@date-fns/tz");

const date1 = new TZDate("2024-10-6", "IST");
const date2 = new TZDate("2024-10-6", "IST");

console.log(date1 - new Date());
