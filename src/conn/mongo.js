const { MongoClient } = require("mongodb");
const path = require("path");

const conf = require("../conf");
const getModel = require("../lib/mongo");

const client = new MongoClient(conf.mongoUrl);
const db = client.db(conf.dbName);
const model = getModel(path.join(__dirname, "..", "mongo"), db);

module.exports = {
  client,
  db,
  model,
};
