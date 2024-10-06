const axios = require("./axios");

async function run() {
  const response = await axios.post("/scheduler/create", {
    name: "one",
    type: "range",
    startTime: "2024-10-05",
    endTime: "2024-10-12",
    startBuffer: 30 * 60 * 1000,
    endBuffer: 60 * 60 * 1000,
    notice: 2 * 60 * 60 * 1000,
    duration: 45 * 60 * 1000,
    stride: 15 * 60 * 1000,
    tz: "Asia/Kolkata",
    configs: {
      0: [
        {
          slotStartTime: 12 * 60 * 60 * 1000,
          slotEndTime: 16 * 60 * 60 * 1000,
        },
        {
          slotStartTime: 18 * 60 * 60 * 1000,
          slotEndTime: 20 * 60 * 60 * 1000,
        },
      ],
      1: [
        {
          slotStartTime: 12 * 60 * 60 * 1000,
          slotEndTime: 16 * 60 * 60 * 1000,
        },
        {
          slotStartTime: 18 * 60 * 60 * 1000,
          slotEndTime: 20 * 60 * 60 * 1000,
        },
      ],
      2: [
        {
          slotStartTime: 12 * 60 * 60 * 1000,
          slotEndTime: 16 * 60 * 60 * 1000,
        },
        {
          slotStartTime: 18 * 60 * 60 * 1000,
          slotEndTime: 20 * 60 * 60 * 1000,
        },
      ],
      3: [
        {
          slotStartTime: 12 * 60 * 60 * 1000,
          slotEndTime: 16 * 60 * 60 * 1000,
        },
        {
          slotStartTime: 18 * 60 * 60 * 1000,
          slotEndTime: 20 * 60 * 60 * 1000,
        },
      ],
      4: [
        {
          slotStartTime: 12 * 60 * 60 * 1000,
          slotEndTime: 16 * 60 * 60 * 1000,
        },
        {
          slotStartTime: 18 * 60 * 60 * 1000,
          slotEndTime: 20 * 60 * 60 * 1000,
        },
      ],
      5: [
        {
          slotStartTime: 12 * 60 * 60 * 1000,
          slotEndTime: 16 * 60 * 60 * 1000,
        },
        {
          slotStartTime: 18 * 60 * 60 * 1000,
          slotEndTime: 20 * 60 * 60 * 1000,
        },
      ],
      6: [
        {
          slotStartTime: 12 * 60 * 60 * 1000,
          slotEndTime: 16 * 60 * 60 * 1000,
        },
        {
          slotStartTime: 18 * 60 * 60 * 1000,
          slotEndTime: 20 * 60 * 60 * 1000,
        },
      ],
    },
  });
  console.log(response.data);
}

run();
