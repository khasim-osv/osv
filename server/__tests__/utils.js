const mongoose = require("mongoose");
//const MongodbMemoryServer = require("mongodb-memory-server").default;
//const mongod = new MongodbMemoryServer();
const config = require("../config.json");
const app = require("../server");

// Create connection to mongoose before all tests
exports.before = async t => {
  //mongoose.connect(await mongod.getConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true });//For temporary mongodb
  await mongoose.connect(config.mongodbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

// Create fixtures before each test
exports.beforeEach = t => {
  t.context.app = app;
};

// Disconnect MongoDB and mongoose after all tests are done
exports.after = t => {
  mongoose.disconnect();
  //mongod.stop();
};
