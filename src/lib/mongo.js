const fs = require("fs");
const _ = require("lodash");
const path = require("path");

function getCollection(dir, db, collectionName) {
  const collDb = db.collection(collectionName);
  return fs
    .readdirSync(path.join(dir, collectionName))
    .reduce((coll, fnName) => {
      const fn = require(path.join(dir, collectionName, fnName));
      const key = _.camelCase(fnName.split(".")[0]);
      coll[key] = fn.bind(null, { db: collDb, model: coll });
      return coll;
    }, {});
}

function getModel(dir, db) {
  return fs.readdirSync(dir).reduce((model, collectionName) => {
    model[collectionName] = getCollection(dir, db, collectionName);
    return model;
  }, {});
}

module.exports = getModel;
