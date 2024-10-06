const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: "6702d3d585f0b9982d1787b6-0E4Y5GYgzpxwCvhk+pJvwurWj8F1bgGs",
  },
});

module.exports = instance;
