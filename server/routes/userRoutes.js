const express = require("express");
const userModel = require("../models/user");
const app = express();

app.post("/login", async ({ body }, res) => {
  const users = await userModel.findOne(body);
  try {
    users
      ? res.status(200).json({ success: true, data: users })
      : res.status(200).json({
          success: false,
          message: "Invalid username and password",
          data: users,
        });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Invalid username and password",
      data: users,
    });
  }
});

module.exports = app;
