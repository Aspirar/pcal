const axios = require("./axios");

async function run() {
  const response = await axios.post(
    "/schedulers/670165d04492194ad600a304/meeting/create",
    {
      startTime: new Date("2024-10-06T13:00:00.000Z"),
      email: "someone@example.com",
    },
  );
  console.log(response.data);
}

run();
