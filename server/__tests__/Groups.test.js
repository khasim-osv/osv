const test = require("ava");
const request = require("supertest");
const { before, beforeEach, after } = require("./utils");
const GroupsModel = require("../models/groups");

test.before(before);
test.beforeEach(beforeEach);

test.serial("Groups - Get data", async (t) => {
  const { app } = t.context;
  const mockKeys = ["_id", "isActive", "value", "__v"];
  await request(app)
    .get("/api/groups/1/3")
    .expect(200)
    .then((res) => {
      if (res.body.success) {
        console.log(mockKeys);
        if (res.body.data !== null && res.body.data[0]) {
          const keys = Object.keys(res.body.data[0]);
          console.log(keys);

          if (JSON.stringify(keys) === JSON.stringify(mockKeys)) {
            t.pass();
          } else {
            t.fail(mockKeys + " != " + keys);
          }
        }
      } else {
        t.fail();
      }
      res.body.success ? t.pass() : t.fail();
    })
    .catch((err) => {
      t.fail(err);
    });
});

test.serial("Groups - Post data", async (t) => {
  const { app } = t.context;
  const mockData = ["_id", "value", "__v"];
  await request(app)
    .post("/api/groups")
    .send({
      key: "modules",
      value: { english: "modules", arabic: "الوحدات" },
      disable: true,
    })
    .expect(200)
    .then(async (res) => {
      if (res.body.success) {
        const keys = Object.keys(res.body.data);
        if (res.body.data !== null && res.body.data._id) {
          if (JSON.stringify(keys) === JSON.stringify(mockData)) {
            t.pass();
          } else {
            t.fail(mockData + " != " + keys);
          }
          await GroupsModel.deleteOne({ _id: res.body.data._id });
        }
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});

// test.serial("Groups - Delete data", async (t) => {
//   const { app } = t.context;
//   const postDataId = await request(app)
//     .post("/api/groups")
//     .send({
//       key: "modules",
//       value: { english: "modules", arabic: "الوحدات" },
//       disable: true,
//     })
//     .expect(200)
//     .then((res) => {
//       return res.body.data._id;
//     })
//     .catch((err) => {
//       t.fail(err);
//     });
//   await request(app)
//     .delete("/api/groups/" + postDataId)
//     .expect(200)
//     .then((res) => {
//       res.body.success ? t.pass() : t.fail();
//     })
//     .catch((err) => {
//       t.fail(err);
//     });
// });

test.serial("Groups - Update data", async (t) => {
  const { app } = t.context;
  const Id = "5eb53674fd94a66f68639abc";
  const mockData = ["_id", "key", "value", "disable"];
  await request(app)
    .put("/api/groups/" + Id)
    .send({
      _id: "5eb53674fd94a66f68639abc",
      key: "modules",
      value: { english: "skype123", arabic: "الوحدات" },
      disable: true,
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
          await GroupsModel.deleteOne({ _id: res.body.data._id });
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
