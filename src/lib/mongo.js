const fs = require("fs");
const path = require("path");

function getCollection(dir, db, collectionName) {
  const collDb = db.collection(collectionName);
  return fs
    .readdirSync(path.join(dir, collectionName))
    .reduce((coll, fnName) => {
      const fn = require(path.join(dir, collectionName, fnName));
      coll[fnName.split(".")[0]] = fn.bind(null, collDb);
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
