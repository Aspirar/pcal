const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: "670159b77a4da371acf5010f-mtSnbg7b2fkHM2ZFfCc86qdChvamt4Zq",
  },
});

module.exports = instance;
