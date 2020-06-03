const test = require("ava");
const request = require("supertest");
const { before, beforeEach, after } = require("./utils");
const userManagement = require("../models/user_management");

test.before(before);
test.beforeEach(beforeEach);

test.serial("Get User Management Data - Get data", async (t) => {
  const { app } = t.context;
  const mockData = [
    "fundTransferLimit",
    "_id",
    "userProfileId",
    "__v",
    "approvalFlow",
    "countryCode",
    "email",
    "mobile",
    "name",
    "nationalId",
    "roleId",
  ];
  await request(app)
    .get("/api/usermanagement/5eb53896fd94a66f68639ac8")
    .expect(200)
    .then((res) => {
      if (res.body.success) {
        if (res.body.data !== null && res.body.data._id) {
          const keys = Object.keys(res.body.data[0]);
          if (keys === mockData) {
            t.pass();
          } else {
            t.fail(mockData + " != " + keys);
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

test.serial("User Management - Post data", async (t) => {
  const { app } = t.context;
  const mockKeys = [
    "fundTransferLimit",
    "_id",
    "userProfileId",
    "__v",
    "approvalFlow",
    "countryCode",
    "email",
    "mobile",
    "name",
    "nationalId",
    "roleId",
  ];
  await request(app)
    .post("/api/usermanagement")
    .send({
      _id: "",
      name: "",
      email: "",
      countryCode: "",
      mobile: "",
      roleId: "",
      nationalId: "",
      fundTransferLimit: {
        currency: "",
        amount: 0,
      },
      approvalFlow: [
        {
          name: "Fund tranfer",
          value: "",
        },
        {
          name: "Payroll services",
          value: "",
        },
        {
          name: "Pending fund transfers",
          value: "",
        },
      ],
    })
    .expect(200)
    .then(async (res) => {
      if (res.body.success) {
        t.pass();

        if (res.body.data && res.body.data._id) {
          const keys = Object.keys(res.body.data);
          if (JSON.stringify(keys) === JSON.stringify(mockKeys)) {
            t.pass();
          } else {
            t.fail(mockKeys + " != " + keys);
          }
          await userManagement.deleteOne({ _id: res.body.data._id });
        }
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});
test.serial("Get Master Roles Data - Get data", async (t) => {
  const { app } = t.context;
  const mockkeys = ["_id", "roleName"];
  await request(app)
    .get("/api/usermanagement/masterroles/5eb53896fd94a66f68639ac8")
    .expect(200)
    .then((res) => {
      if (res.body.success) {
        if (res.body.data !== null && res.body.data[0]._id) {
          const keys = Object.keys(res.body.data[0]);
          if (JSON.stringify(keys) === JSON.stringify(mockkeys)) {
            t.pass();
          } else {
            t.fail(mockkeys + " != " + keys);
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
