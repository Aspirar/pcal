const axios = require("./axios");

async function run() {
  const response = await axios.get(
    "/schedulers/670165d04492194ad600a304/slots",
    {
      params: { startTime: new Date() },
    },
  );
  console.log(response.data);
}

run();
