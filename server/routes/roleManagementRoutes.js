const express = require("express");
const roleManagementModel = require("../models/role_management");
const mongoose = require("mongoose");
const app = express();

app.get("/getAllRoles/:userProfileId", async (req, res) => {
  const roleManagement = await roleManagementModel.find({
    userProfileId: req.params.userProfileId,
  });
  try {
    res.status(200).json({
      success: true,
      data: roleManagement,
    });
  } catch (err) {
    res.status(200).json({ success: false, data: roleManagement });
  }
});

app.get("/rolemanagement/:id", async (req, res) => {
  const roleManagement = await roleManagementModel.findOne({
    _id: req.params.id,
  });
  try {
    res.status(200).json({
      success: true,
      data: roleManagement,
    });
  } catch (err) {
    res.status(200).json({ success: false, data: roleManagement });
  }
});

app.post("/rolemanagement", async (req, res) => {
  let filter = {};
  if (req.body._id === "") {
    filter = { userProfileId: "undefined" }; //pass wrong filter if no _id to insert
    delete req.body._id;
  } else {
    filter = { _id: mongoose.Types.ObjectId(req.body._id) };
  }
  const roleManagement = await roleManagementModel.findOneAndUpdate(
    filter,
    req.body,
    { upsert: true, new: true }
  );
  try {
    res.status(200).json({ success: true, data: roleManagement });
  } catch (err) {
    res.status(200).json({ success: false, data: roleManagement });
  }
});

module.exports = app;
