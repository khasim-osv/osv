const test = require("ava");
const request = require("supertest");
const { before, beforeEach, after } = require("./utils");
const Translation = require("../models/translation");

test.before(before);
test.beforeEach(beforeEach);

test.serial("Translation - Get data", async (t) => {
  const { app } = t.context;
  const mockKeys = ["_id", "key", "value", "__v", "isActive"];
  await request(app)
    .get("/api/translations/1/3")
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

test.serial("Translation - Post data", async (t) => {
  const { app } = t.context;
  const mockData = ["_id", "key", "value", "__v"];
  await request(app)
    .post("/api/translations")
    .send({ key: "modules", value: { english: "modules", arabic: "الوحدات" } })
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
          await Translation.deleteOne({ _id: res.body.data._id });
        }
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});

// test.serial("Translation - Delete data", async (t) => {
//   const { app } = t.context;
//   const postDataId = await request(app)
//     .post("/api/translations")
//     .send({ key: "modules", value: { english: "modules", arabic: "الوحدات" } })
//     .expect(200)
//     .then((res) => {
//       return res.body.data._id;
//     })
//     .catch((err) => {
//       t.fail(err);
//     });
//   await request(app)
//     .delete("/api/translations/" + postDataId)
//     .expect(200)
//     .then((res) => {
//       res.body.success ? t.pass() : t.fail();
//     })
//     .catch((err) => {
//       t.fail(err);
//     });
// });

test.serial("Translation - Update data", async (t) => {
  const { app } = t.context;
  const mockKeys = ["key", "value"];
  const Id = "5e9d5d031c9d44000060a6da";
  await request(app)
    .put("/api/translations/" + Id)
    .send({ key: "modules", value: { english: "modules", arabic: "الوحدات" } })
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
