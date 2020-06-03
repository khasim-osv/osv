const express = require("express");
const userManagementModel = require("../models/user_management");
const roleManagementModel = require("../models/role_management");
const mongoose = require("mongoose");
const randomstring = require("randomstring");
const userModel = require("../models/user");
const isEmpty = require("lodash.isempty");
const userProfileService = require("../services/userProfileService");

const app = express();

app.get("/usermanagement/:id", async (req, res) => {
  const userManagement = await userManagementModel.findOne({
    _id: req.params.id,
  });
  try {
    res.status(200).json({
      success: true,
      data: userManagement,
    });
  } catch (err) {
    res.status(200).json({ success: false, data: userManagement });
  }
});

app.post("/usermanagement", async (req, res) => {
  let filter = {};
  let token, newUser;

  if (isEmpty(req.body._id)) {
    req.body._id = new require("mongoose").mongo.ObjectID();
    newUser = true;
  }

  filter = { _id: mongoose.Types.ObjectId(req.body._id) };

  try {
    const userManagement = await userManagementModel.findOneAndUpdate(
      filter,
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: userManagement });
  } catch (err) {
    res.status(200).json({ success: false, data: {} });
  }
  /* const user = new userModel({
      email: req.body.email,
      userProfileId: req.body._id,
      isAdmin: false,
    }); */
  const { email, userProfileId } = req.body;
  const user = new userModel({
    email,
    userProfileId,
    isAdmin: false,
  });
  token = randomstring.generate(7);
  user.password = user.generateHash(token);

  await userModel.findOneAndUpdate({ _id: req.body._id }, user, {
    upsert: true,
  });

  if (newUser) {
    userProfileService.sendPasswordMail(req.body.email, token);
  }
});

app.get("/usermanagement/masterroles/:userProfileId", async (req, res) => {
  const roles = await roleManagementModel.find(
    {
      userProfileId: req.params.userProfileId,
    },
    "roleName"
  );
  try {
    res.status(200).json({ success: true, data: roles });
  } catch (err) {
    res.status(200).json({ success: false, data: roles });
  }
});

app.get("/users/:profileId", async (req, res) => {
  const users = await userManagementModel.find(
    {
      userProfileId: req.params.profileId,
    },
    { name: 1, modulesCategory: 1 }
  );
  try {
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(200).json({ success: false, data: users });
  }
});

module.exports = app;
