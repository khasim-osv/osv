const test = require("ava");
const request = require("supertest");
const { before, beforeEach, after } = require("./utils");

test.before(before);
test.beforeEach(beforeEach);

test.serial("Banks - Get data", async (t) => {
  const { app } = t.context;
  const mockKeys = ["_id", "bank", "url", "type", "logo", "isDisabled", "__v"];
  await request(app)
    .get("/api/banks/1/3")
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

// test.serial("Banks - Post data", async (t) => {
//   const { app } = t.context;
//   await request(app)
//     .post("/api/banks")
//     .send({
//       logo: "modules",
//       bank: "modules",
//       url: "modules",
//       type: "modules",
//     })
//     .expect(200)
//     .then((res) => {
//       res.body.success ? t.pass() : t.fail();
//     })
//     .catch((err) => {
//       t.fail(err);
//     });
// });

test.serial("Banks - Update data", async (t) => {
  const { app } = t.context;
  const Id = "5e9d5d031c9d44000060a6da";
  const mockKeys = ["logo", "bank", "url", "type", "disable"];
  await request(app)
    .put("/api/banks/" + Id)
    .send({
      logo: "modules",
      bank: "modules",
      url: "modules",
      type: "modules",
      disable: true,
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
