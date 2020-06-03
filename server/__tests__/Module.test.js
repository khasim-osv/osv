const test = require("ava");
const request = require("supertest");
const { before, beforeEach, after } = require("./utils");
const Modules = require("../models/modules");
test.before(before);
test.beforeEach(beforeEach);
test.serial("Modules - Get data", async (t) => {
  const { app } = t.context;
  const mockKeys = [
    "_id",
    "moduleName",
    "Web",
    "isActive",
    "Mobile",
    "App",
    "APIs",
    "categoryId",
    "__v",
  ];
  await request(app)
    .get("/api/modules/1/3")
    .expect(200)
    .then((res) => {
      res.body.success ? t.pass() : t.fail();
      if (res.body.success) {
        if (res.body.data !== null && res.body.data) {
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

test.serial("Modules - Post data", async (t) => {
  const { app } = t.context;
  const mockKeys = [
    "_id",
    "moduleName",
    "Web",
    "isActive",
    "Mobile",
    "App",
    "APIs",
    "categoryId",
    "__v",
  ];
  await request(app)
    .post("/api/addModule")
    .send({
      moduleName: "inflow",
      Web: true,
      isActive: true,
      Mobile: false,
      App: false,
      APIs: false,
      categoryId: "5ea002dc6a68db8ced6f4553",
    })
    .expect(200)
    .then(async (res) => {
      if (res.body.success) {
        if (res.body.data !== null && res.body.data) {
          const keys = Object.keys(res.body.data);
          if (JSON.stringify(keys) === JSON.stringify(mockKeys)) {
            t.pass();
          } else {
            t.fail(mockKeys + " != " + keys);
          }
          await Modules.deleteOne({ _id: res.body.data._id });
        }
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});

test.serial("Modules - Update data", async (t) => {
  const { app } = t.context;
  const Id = "5e9d5d031c9d44000060a6da";
  const mockKeys = ["moduleName", "Web", "Mobile", "App", "APIs", "categoryId"];
  await request(app)
    .put("/api/modules/" + Id)
    .send({
      moduleName: "Schedule payment",
      Web: false,
      Mobile: true,
      App: true,
      APIs: false,
      categoryId: "5e9c27636e9fb152343bfe7f",
    })
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
