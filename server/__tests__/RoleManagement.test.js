const test = require("ava");
const request = require("supertest");
const { before, beforeEach, after } = require("./utils");
const roleManagementModel = require("../models/role_management");

test.before(before);
test.beforeEach(beforeEach);
//deep level
test.serial("Role Management - Get data", async (t) => {
  const { app } = t.context;
  const mockKeys = ["_id", "categoryName", "modules"];
  const moduleLevel = ["_id", "moduleName"];
  await request(app)
    .get("/api/rolemanagement/mastermodules/5ebbbd70779ce227287f580a")
    .expect(200)
    .then((res) => {
      if (res.body.success) {
        if (res.body.data !== null && res.body.data[0]) {
          const keys = Object.keys(res.body.data[0]);
          const modules = res.body.data[0].modules[0];

          const modulesCheck = Object.keys(modules);

          if (
            JSON.stringify(keys) === JSON.stringify(mockKeys) &&
            JSON.stringify(moduleLevel) === JSON.stringify(modulesCheck)
          ) {
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

test.serial("Role Management based on id - Get data", async (t) => {
  const { app } = t.context;
  const mockKeys = [
    "_id",
    "userProfileId",
    "__v",
    "isActive",
    "modulesCategory",
    "roleName",
  ];
  await request(app)
    .get("/api/rolemanagement/5ebbbda80b18b22fb0445f7a")
    .expect(200)
    .then((res) => {
      if (res.body.success) {
        if (res.body.data && res.body.data !== null) {
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

test.serial("Role Management - Post data", async (t) => {
  const { app } = t.context;
  const mockKeys = [
    "_id",
    "userProfileId",
    "__v",
    "isActive",
    "modulesCategory",
    "roleName",
  ];
  await request(app)
    .post("/api/rolemanagement")
    .send({
      _id: "",
      roleName: "managers",
      modulesCategory: [
        {
          _id: "5ea002cd6a68db8ced6f4552",
          modules: [{ _id: "5eb5374ffd94a66f68639ac0" }],
        },
        {
          _id: "5e9c27636e9fb152343bfe7f",
          modules: [{ _id: "5eb5371efd94a66f68639abe" }],
        },
        {
          _id: "5ea002dc6a68db8ced6f4553",
          modules: [{ _id: "5eb53774fd94a66f68639ac2" }],
        },
      ],
      userProfileId: "5eb6ee7bd68ec939187eabed",
      isActive: true,
      success: false,
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
          await roleManagementModel.deleteOne({ _id: res.body.data._id });
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
