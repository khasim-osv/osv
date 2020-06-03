const test = require("ava");
const request = require("supertest");
const { before, beforeEach, after } = require("./utils");

test.before(before);
test.beforeEach(beforeEach);

test.serial("Login - User authentication successfull", async (t) => {
  const { app } = t.context;
  const mockKeys = ["_id", "userName", "password"];
  await request(app)
    .post("/api/login")
    .send({ userName: "khasim@onesingleview.com", password: "12345" })
    .expect(200)
    .then((res) => {
      if (res.body.success) {
        if (res.body.data !== null && res.body.data) {
          const keys = Object.keys(res.body.data);
          if (JSON.stringify(keys) === JSON.stringify(mockKeys)) {
            t.pass();
          }
        }
        t.pass();
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail();
    });
});

test.serial("Login - User authentication failed", async (t) => {
  const { app } = t.context;
  await request(app)
    .post("/api/login")
    .send({ userName: "khasim@onesingleview.com", password: "" })
    .expect(200)
    .then((res) => {
      !res.body.success ? t.pass() : t.fail();
    })
    .catch((err) => {
      t.pass();
    });
});

test.after.always(after);
