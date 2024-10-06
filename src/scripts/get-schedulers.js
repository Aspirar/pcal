const axios = require("./axios");

async function run() {
  const response = await axios.get("/schedulers");
  console.log(response.data);
}

run();
