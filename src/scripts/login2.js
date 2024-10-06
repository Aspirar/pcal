const axios = require("./axios");

async function run() {
  const response = await axios.post("/login", {
    username: "test-user-2",
    password: "abcd",
  });
  console.log(response.data);
}

run();
