const axios = require("./axios");

async function run() {
  const response = await axios.post(
    "/schedulers/6702d40a1edd6f69cd7a5226/meeting/create",
    {
      startTime: "2024-10-07T15:00:00.000+05:30",
      email: "someone@example.com",
    },
  );
  console.log(response.data);
}

run();
