const { model, client } = require("../conn/mongo");

async function createIndexes() {
  for (const coll of Object.keys(model)) {
    if (model[coll].createIndexes) {
      await model[coll].createIndexes();
      console.log(`Created indexes for collection ${coll}`);
    }
  }
}

createIndexes().then(() => {
  console.log(`Created all indexes`);
  client.close();
});
