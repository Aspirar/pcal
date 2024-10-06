const axios = require("./axios");

async function run() {
  const response = await axios.get(
    "/schedulers/67028caaba549163f1cfc4fe/slots",
    {
      params: { startDate: "2024-10-07", tz: "Asia/Kolkata" },
    },
  );
  console.log(response.data);
}

run();
