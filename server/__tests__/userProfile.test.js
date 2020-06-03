const test = require("ava");
const request = require("supertest");
const { before, beforeEach, after } = require("./utils");
const userProfile = require("../models/userProfile");

test.before(before);
test.beforeEach(beforeEach);

test.serial("User Profile - Get data", async (t) => {
  const { app } = t.context;
  const mockData = [
    "_id",
    "__v",
    "address",
    "businessType",
    "company",
    "erpService",
    "groupId",
    "licenceTypeId",
    "communication",
    "userManagement",
    "noOfUsers",
    "companyName",
    "companyNameAr",
  ];
  await request(app)
    .get("/api/userprofiles/getUserprofile/5ebbbd70779ce227287f580a")
    .expect(200)
    .then((res) => {
      if (res.body.success) {
        if (res.body.companyInfoData !== null && res.body.companyInfoData) {
          const keys = Object.keys(res.body.companyInfoData);
          if (JSON.stringify(keys) === JSON.stringify(mockData)) {
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

test.serial("Add company - Post data", async (t) => {
  const { app } = t.context;
  const mockData = [
    "groupId",
    "address",
    "businessType",
    "licenceTypeId",
    "erpService",
    "company",
    "_id",
  ];
  await request(app)
    .post("/api/userProfile/addCompanyInfo")
    .send({
      companyName: "Qount",
      companyNameAr: "السحابة التاسعه",
      groupId: "5eb53674fd94a66f68639abc",
      address: "216",
      businessType: "Oil & Paints",
      licenceTypeId: "5eb537d2fd94a66f68639ac3",
      erpService: "Microsoft Dynamics",
      company: { english: "Colud Nine", arabic: "السحابة التاسعه" },
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
          await userProfile.deleteOne({ _id: res.body.data._id });
        }
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});

test.serial("user profiles search - Post data", async (t) => {
  const { app } = t.context;
  const mockKeys = [
    "_id",
    "__v",
    "address",
    "businessType",
    "company",
    "erpService",
    "groupId",
    "licenceTypeId",
  ];
  await request(app)
    .post("/api/userprofiles/search")
    .send({ search: "Colud Nine", page: 1, pageSize: 3 })
    .expect(200)
    .then(async (res) => {
      if (res.body.success) {
        if (
          res.body.data !== null &&
          res.body.data.length &&
          res.body.data[0]
        ) {
          const keys = Object.keys(res.body.data[0]);
          if (JSON.stringify(keys) === JSON.stringify(mockKeys)) {
            t.pass();
          } else {
            t.fail(mockKeys + " != " + keys);
          }
          await userProfile.deleteOne({ _id: res.body.data[0]._id });
        }
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});
test.serial("All User Profile - Get data", async (t) => {
  const { app } = t.context;
  const mockKeys = [
    "_id",
    "__v",
    "address",
    "businessType",
    "company",
    "erpService",
    "groupId",
    "licenceTypeId",
    "workflowManagement",
    "noOfUsers",
  ];

  await request(app)
    .get("/api/userprofiles/1/3")
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

test.serial("Work flow management - Post data", async (t) => {
  const { app } = t.context;
  const mockKeys = ["workflowManagement"];
  await request(app)
    .post("/api/userProfile/addWorkflowManagement")
    .send({
      workflowManagement: {},
      userProfileId: "5ebb81f86058b904c47cb7a7",
    })
    .expect(200)
    .then(async (res) => {
      if (res.body.success) {
        if (res.body.data && res.body.data) {
          const keys = Object.keys(res.body.data);
          if (JSON.stringify(keys) === JSON.stringify(mockKeys)) {
            t.pass();
          } else {
            t.fail(mockKeys + " != " + keys);
          }
          await userProfile.deleteOne({ _id: res.body.data._id });
        }
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});

test.serial("Communications - Post data", async (t) => {
  const { app } = t.context;
  await request(app)
    .post("/api/userProfile/saveCommunication")
    .send({
      enableCommunication: true,
      userProfileId: "5ebbbd70779ce227287f580a",
    })
    .expect(200)
    .then(async (res) => {
      if (res.body.success) {
        t.pass();
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});

test.serial("Save signin info - Post data", async (t) => {
  const { app } = t.context;
  const mockData = [
    "userId",
    "email",
    "phCode",
    "phone",
    "twoStepVerification",
    "userProfileId",
    "_id",
    "password",
  ];
  await request(app)
    .post("/api/userProfile/saveSignInInfo")
    .send({
      userId: "123456",
      email: "nazia@onesingleview.com",
      phCode: "+964",
      phone: "9566555586",
      twoStepVerification: true,
      userProfileId: "5eba45fb1a9ef70df88ab3d0",
    })
    .expect(200)
    .then(async (res) => {
      res.body.success ? t.pass() : t.fail();
      if (res.body.success) {
        if (res.body.data && res.body.data) {
          const keys = Object.keys(res.body.data);
          if (JSON.stringify(keys) === JSON.stringify(mockData)) {
            t.pass();
          } else {
            t.fail(mockData + " != " + keys);
          }
          await userProfile.deleteOne({ _id: res.body.data._id });
        }
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});

test.serial("Save Bank Info - Post data", async (t) => {
  const { app } = t.context;
  await request(app)
    .post("/api/userProfile/saveBankAccountsInfo")
    .send({
      bank: "Al Rajhi Bank",
      userID: "nazia@osv.com",
      password: "123456",
      userProfileId: "5eba45fb1a9ef70df88ab3d0",
    })
    .expect(200)
    .then(async (res) => {
      if (res.body.success) {
        // if (res.body.data && res.body.data._id) {
        //   await userProfile.deleteOne({ _id: res.body.data._id });
        // }
        t.pass();
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail(err);
    });
});
test.serial("User Profile - Get Create User Page data", async (t) => {
  const { app } = t.context;
  const mockKeys = ["licenses", "groups", "banks", "categories"];
  await request(app)
    .get("/api/userProfile/getcreateUserPageData")
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
