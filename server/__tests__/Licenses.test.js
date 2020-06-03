const test = require("ava");
const request = require("supertest");
const { before, beforeEach, after } = require("./utils");
const LicensesModel = require("../models/licenses");

test.before(before);
test.beforeEach(beforeEach);

test.serial("Licenses - Get data", async (t) => {
  const { app } = t.context;
  const mockKeys = [
    "_id",
    "modules",
    "licenseName",
    "noOfUsers",
    "noOfTransactions",
    "__v",
    "modules_info",
  ];
  await request(app)
    .get("/api/licenses")
    .expect(200)
    .then((res) => {
      if (res.body.success) {
        if (res.body.data !== null && res.body.data[0]) {
          const keys = Object.keys(res.body.data[0]);
          if (JSON.stringify(keys) === JSON.stringify(mockKeys)) {
            t.pass();
          } else {
            t.fail(mockKeys + " != " + keys);
          }
        }
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});

test.serial("Licenses - Post data", async (t) => {
  const { app } = t.context;
  const mockData = [
    "modules",
    "_id",
    "licenseName",
    "noOfUsers",
    "noOfTransactions",
    "__v",
  ];
  const data = {
    licenseName: "Premium",
    modules: [
      "5ea004610439620d96836fb5",
      "5ea004c80439620d96836fb6",
      "5ea00f3b0439620d96836fbd",
    ],
    noOfUsers: "10",
    noOfTransactions: "1000",
  };
  await request(app)
    .post("/api/addLicense")
    .send(data)
    .expect(200)
    .then(async (res) => {
      if (res.body.success) {
        if (res.body.data !== null && res.body.data) {
          const keys = Object.keys(res.body.data);
          if (JSON.stringify(keys) === JSON.stringify(mockData)) {
            t.pass();
          } else {
            t.fail(mockData + " != " + keys);
          }
          await LicensesModel.deleteOne({ _id: res.body.data._id });
        }
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});

test.serial("Licenses - Update data", async (t) => {
  const { app } = t.context;
  const Id = "5ea18f9cbe85b15d900a77fd";
  const mockKeys = [
    "_id",
    "licenseName",
    "modules",
    "noOfUsers",
    "noOfTransactions",
  ];
  const data = {
    _id: "5ea18f9cbe85b15d900a77fd",
    licenseName: "Premium1",
    modules: [
      "5ea004610439620d96836fb5",
      "5ea004c80439620d96836fb6",
      "5ea00f3b0439620d96836fbd",
    ],
    noOfUsers: "10",
    noOfTransactions: "1000",
  };
  await request(app)
    .put("/api/licenses/" + Id)
    .send(data)
    .expect(200)
    .then((res) => {
      if (res.body.success) {
        if (res.body.data !== null && res.body.data) {
          const keys = Object.keys(res.body.data);
          if (JSON.stringify(keys) === JSON.stringify(mockKeys)) {
            t.pass();
          } else {
            t.fail(mockKeys + " != " + keys);
          }
        }
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});

test.after.always(after);
