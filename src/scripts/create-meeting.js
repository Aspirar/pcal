const axios = require("./axios");

async function run() {
  const response = await axios.post(
    "/schedulers/67028caaba549163f1cfc4fe/meeting/create",
    {
      startTime: "2024-10-06T18:15:00.000+05:30",
      email: "someone@example.com",
    },
  );
  console.log(response.data);
}

run();
