const axios = require("./axios");

async function run() {
  const response = await axios.post("/meeting/6702b7ed20c169eb6db0c871/delete");
  console.log(response.data);
}

run();
