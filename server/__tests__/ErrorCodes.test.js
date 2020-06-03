const test = require("ava");
const request = require("supertest");
const { before, beforeEach, after } = require("./utils");
const ErrorCodesModel = require("../models/errorCodes");

test.before(before);
test.beforeEach(beforeEach);

test.serial("ErrorCodes - Get data", async (t) => {
  const { app } = t.context;
  const mockKeys = ["_id", "key", "errorcode", "isDisabled", "value", "__v"];

  await request(app)
    .get("/api/errorCodes/1/3")
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

test.serial("ErrorCodes - Post data", async (t) => {
  const { app } = t.context;
  const mockData = ["_id", "key", "errorcode", "value", "__v"];
  await request(app)
    .post("/api/errorCodes")
    .send({
      key: "modules",
      errorcode: "modules",
      value: { english: "modules", arabic: "الوحدات" },
    })
    .expect(200)
    .then(async (res) => {
      if (res.body.success) {
        if (res.body.data !== null && res.body.data._id) {
          const keys = Object.keys(res.body.data);
          if (res.body.data !== null && res.body.data._id) {
            if (JSON.stringify(keys) === JSON.stringify(mockData)) {
              t.pass();
            } else {
              t.fail(mockData + " != " + keys);
            }
          }
          await ErrorCodesModel.deleteOne({ _id: res.body.data._id });
        }
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});
// test.serial("ErrorCodes - Delete data", async (t) => {
//   const { app } = t.context;
//   const postDataId = await request(app)
//     .post("/api/errorCodes")
//     .send({
//       key: "modules",
//       errorcode: "modules",
//       value: { english: "modules", arabic: "الوحدات" },
//     })
//     .expect(200)
//     .then((res) => {
//       return res.body.data._id;
//     })
//     .catch((err) => {
//       t.fail(err);
//     });
//   await request(app)
//     .delete("/api/errorCodes/" + postDataId)
//     .expect(200)
//     .then((res) => {
//       res.body.success ? t.pass() : t.fail();
//     })
//     .catch((err) => {
//       t.fail(err);
//     });
// });

test.serial("ErrorCodes - Update data", async (t) => {
  const { app } = t.context;
  const mockData = ["key", "errorcode", "value"];
  const Id = "5e9d5d031c9d44000060a6da";
  await request(app)
    .put("/api/errorCodes/" + Id)
    .send({
      key: "modules",
      errorcode: "modules",
      value: { english: "modules", arabic: "الوحدات" },
    })
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
          await ErrorCodesModel.deleteOne({ _id: res.body.data._id });
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
