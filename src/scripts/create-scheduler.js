const axios = require("./axios");

async function run() {
  const response = await axios.post("/scheduler/create", {
    name: "one",
    startTime: new Date("2024-10-05"),
    endTime: new Date("2024-10-12"),
    slotStartTime: 12 * 60 * 60 * 1000,
    slotEndTime: 16 * 60 * 60 * 1000,
  });
  console.log(response.data);
}

run();
