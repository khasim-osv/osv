const express = require("express");
const userProfileModel = require("../models/userProfile");
const categoryMasterModel = require("../models/CategoryMaster");
const UserProfileModel = require("../models/userProfile");
const licenseModel = require("../models/licenses");
const mongoose = require("mongoose");
const userProfileController = require("../controllers/userProfileController");
const workFlowModel = require("../models/workFlowManagement");
const roleManagementModel = require("../models/role_management");

const app = express();

app.get(
  "/userprofiles/getUserprofile/:profileId",
  userProfileController.getUserProfile
);

app.post("/userprofiles/search", userProfileController.searchUserProfile);

app.post("/userProfile/addCompanyInfo", userProfileController.addCompanyInfo);

app.post(
  "/userProfile/addWorkflowManagement",
  userProfileController.addWorkflowManagement
);
app.post(
  "/userProfile/saveCommunication",
  userProfileController.saveCommunication
);
app.post("/userProfile/saveSignInInfo", userProfileController.saveSignInInfo);
app.post(
  "/userProfile/saveBankAccountsInfo",
  userProfileController.saveBankAccountsInfo
);
app.get(
  "/userProfile/getCreateUserPageData",
  userProfileController.getCreateUserPageData
);
app.get("/userprofiles/:page/:pageSize", userProfileController.getUserProfiles);

app.post("/userprofiles", async ({ body }, res) => {
  const userProfiles = new userProfileModel(body);
  try {
    await userProfiles.save();
    res.status(200).json({ success: true, data: userProfiles });
  } catch (err) {
    res.status(200).json({ success: false, message: err, data: userProfiles });
  }
});

app.put("/userprofiles/:id", async (req, res) => {
  try {
    await userProfileModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: req.body });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Something wrong with the API...!",
      data: req.body,
    });
  }
});

app.delete("/userprofiles/:id", async (req, res) => {
  const userProfiles = await userProfileModel.findByIdAndDelete(req.params.id);
  try {
    !userProfiles
      ? res.status(200).json({ success: false, data: userProfiles })
      : res.status(200).json({ success: true, data: userProfiles });
  } catch (err) {
    res.status(200).json({ success: false, data: userProfiles });
  }
});

app.get("/licence/categories/modules/:profileId", async (req, res) => {
  const userProfile = await UserProfileModel.findOne({
    _id: mongoose.Types.ObjectId(req.params.profileId),
  });
  const licence = await licenseModel.findOne({
    _id: userProfile.licenceTypeId,
  });
  let moduleIds = licence.modules.map((id) => new mongoose.Types.ObjectId(id));
  const cat = await categoryMasterModel.aggregate([
    {
      $facet: {
        data: [
          {
            $lookup: {
              from: "ModuleMaster",
              localField: "_id",
              foreignField: "categoryId",
              as: "modules",
            },
          },
          { $unwind: "$modules" },
          {
            $match: {
              "modules._id": {
                $in: moduleIds,
              },
            },
          },
          {
            $group: {
              _id: "$_id",
              categoryName: { $first: "$categoryName" },
              modules: {
                $push: {
                  _id: "$modules._id",
                  moduleName: "$modules.moduleName",
                },
              },
            },
          },
          { $sort: { categoryName: 1 } },
        ],
      },
    },
  ]);

  const data = cat[0].data;

  try {
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(200).json({ success: false, data: data });
  }
});

app.get("/workflow/:profileId", async (req, res) => {
  const workflow = await workFlowModel.findOne({
    userProfileId: req.params.profileId,
  });
  try {
    res.status(200).json({
      success: true,
      data: workflow,
    });
  } catch (err) {
    res.status(200).json({ success: false, data: workflow });
  }
});

app.post("/workflow", async (req, res) => {
  let filter = {};
  if (req.body._id === "") {
    filter = { userProfileId: "undefined" }; //pass wrong filter if no _id to insert
    delete req.body._id;
  } else {
    filter = { _id: mongoose.Types.ObjectId(req.body._id) };
  }
  const workflow = await workFlowModel.findOneAndUpdate(filter, req.body, {
    new: true,
    upsert: true,
  });

  try {
    res.status(200).json({
      success: true,
      data: workflow,
    });
  } catch (err) {
    res.status(200).json({ success: false, data: workflow });
  }
});

app.get("/role/modules/:profileId/:roleId", async (req, res) => {
  const roleModules = await roleManagementModel.findOne({
    _id: mongoose.Types.ObjectId(req.params.roleId),
  });
  let moduleIds = [];
  roleModules.modulesCategory.forEach((mod) => {
    mod.modules.forEach((module) =>
      moduleIds.push(mongoose.Types.ObjectId(module._id))
    );
  });
  const cat = await categoryMasterModel.aggregate([
    {
      $facet: {
        data: [
          {
            $lookup: {
              from: "ModuleMaster",
              localField: "_id",
              foreignField: "categoryId",
              as: "modules",
            },
          },
          { $unwind: "$modules" },
          {
            $match: {
              "modules._id": {
                $in: moduleIds,
              },
            },
          },
          {
            $group: {
              _id: "$_id",
              categoryName: { $first: "$categoryName" },
              modules: {
                $push: {
                  _id: "$modules._id",
                  moduleName: "$modules.moduleName",
                },
              },
            },
          },
          { $sort: { categoryName: 1 } },
        ],
      },
    },
  ]);

  const workflow = await workFlowModel.findOne({
    userProfileId: mongoose.Types.ObjectId(req.params.profileId),
  });

  const data = cat[0].data;
  let dat = [];
  data.forEach((roleModules) => {
    let tempModules = [];
    roleModules.modules.forEach((roleModule) => {
      workflow.modulesCategory.forEach((modules) => {
        modules.modules.forEach((module) => {
          if (roleModule._id.toString() === module.moduleId) {
            roleModule.workflow = module.workflow;
            tempModules.push(roleModule);
          }
        });
      });
    });
    tempModules.length > 0 &&
      dat.push({ ...roleModules, modules: tempModules });
  });

  try {
    res.status(200).json({
      success: true,
      data: dat,
    });
  } catch (err) {
    res.status(200).json({ success: false, data: dat });
  }
});

module.exports = app;
