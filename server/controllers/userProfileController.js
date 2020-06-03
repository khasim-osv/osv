const licenseModel = require("../models/licenses");
const groupsModel = require("../models/groups");
//const Customers = require("../models/customers");
const userModel = require("../models/user");
const BankAccountsUPModel = require("../models/bankAccounts");
const BanksModel = require("../models/banks");
const categoriesModel = require("../models/CategoryMaster");
const randomstring = require("randomstring");
const userProfileModel = require("../models/userProfile");
const mongoose = require("mongoose");
const userProfileService = require("../services/userProfileService");
const Constants = require("../constants.js");

exports.getCreateUserPageData = async ({ body }, res) => {
  try {
    let data = await userProfileService.getCreateUserPageData();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error, data: {} });
  }
};

exports.saveSignInInfo = async ({ body }, res) => {
  //const signInInfo = new Customers(body);
  const signInInfo = new userModel(body);
  let token, newUser;

  if (!signInInfo._id) {
    newUser = true;
    signInInfo._id = new require("mongoose").mongo.ObjectID();
    token = randomstring.generate(7);
    signInInfo.password = signInInfo.generateHash(token);
    signInInfo.isAdmin = true;
  }

  try {
    await userModel.findOneAndUpdate(
      { _id: signInInfo._id },
      signInInfo,
      // { ...signInInfo, isAdmin: true },  //throwing error -> obj.toobject is not a function
      {
        upsert: true,
      }
    );
    res.status(200).json({ success: true, data: signInInfo });

    if (newUser) {
      userProfileService.sendPasswordMail(body.email, token);
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err, data: signInInfo });
  }
};

exports.saveBankAccountsInfo = async ({ body }, res) => {
  const bankAccounts = new BankAccountsUPModel(body);

  if (!bankAccounts._id) {
    bankAccounts._id = new require("mongoose").mongo.ObjectID();
  }
  try {
    //  await bankAccounts.save();
    await BankAccountsUPModel.findOneAndUpdate(
      { _id: bankAccounts._id },
      bankAccounts,
      { upsert: true }
    );
    res.status(200).json({ success: true, data: bankAccounts });
  } catch (err) {
    res.status(500).json({ success: false, message: err, data: bankAccounts });
  }
};

exports.addWorkflowManagement = async ({ body }, res) => {
  try {
    let userProfile = await userProfileModel.findOne({
      _id: body.userProfileId,
    });

    userProfile.workflowManagement = body.workflowManagement;
    await userProfile.save();
    res.status(200).json({
      success: true,
      data: { workflowManagement: body.workflowManagement },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
      data: { workflowManagement: body.workflowManagement },
    });
  }
};

exports.saveCommunication = async ({ body }, res) => {
  try {
    let userProfile = await userProfileModel.findOne({
      _id: body.userProfileId,
    });

    userProfile.communication = body.enableCommunication;
    await userProfile.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

exports.getUserProfile = async (req, res) => {
  let matchAggr = {
    $match: { _id: mongoose.Types.ObjectId(req.params.profileId) },
  };

  let lookUpAggr = {
    $facet: {
      data: [
        { $addFields: { _id: { $toString: "$_id" } } },
        /*   {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "userProfileId",
            as: "customer",
          },
        }, */
        {
          $lookup: {
            from: "users",
            let: {
              foreign_id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: [true, "$isAdmin"] },
                      { $eq: ["$userProfileId", "$$foreign_id"] },
                    ],
                  },
                },
              },
            ],
            as: "customer",
          },
        },
        {
          $unwind: {
            path: "$customer",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "UserBankAccounts",
            localField: "_id",
            foreignField: "userProfileId",
            as: "banks",
          },
        },
        {
          $lookup: {
            from: "role_managements",
            localField: "_id",
            foreignField: "userProfileId",
            as: "roleManagement",
          },
        },
        {
          $lookup: {
            from: "user_managements",
            localField: "_id",
            foreignField: "userProfileId",
            as: "userManagement",
          },
        },
        {
          $addFields: {
            noOfUsers: { $size: "$userManagement" },
          },
        },
      ],
      totalRecords: [{ $count: "totalRecords" }],
    },
  };

  // let data = await userProfileService.getCreateUserPageData();

  let [
    { licenses, groups, banks, categories },
    userProfiles,
  ] = await Promise.all([
    userProfileService.getCreateUserPageData(req.params.profileId),
    userProfileModel.aggregate([matchAggr, lookUpAggr]),
  ]);

  try {
    let data = userProfiles[0].data;
    let signInInfoData = data[0].customer;
    let bankAccounts = { banks: data[0].banks };
    delete data[0].customer;
    delete data[0].banks;
    let roles = data[0].roleManagement.map((role) => {
      return {
        _id: role._id,
        roleName: role.roleName,
      };
    });
    delete data[0].roleManagement;
    let users = data[0].userManagement.map((user) => {
      return {
        _id: user._id,
        roleName: user.roleId,
        email: user.email,
      };
    });
    delete data[0].userManagement;
    // let companyInfoData = data;
    res.status(200).json({
      success: true,
      //data: data,
      companyInfoData: {
        ...data[0],
        companyName: data[0].company.english,
        companyNameAr: data[0].company.arabic,
        //
        groupId: groups[data[0].groupId],
        businessType: Constants.CONST_BUSINESS_TYPES.find(
          (business) => business.value === data[0].businessType
        ),
        licenceTypeId: licenses[data[0].licenceTypeId],
        erpService: Constants.CONST_ERP_TYPES.find(
          (erp) => erp.value === data[0].erpService
        ),
      },
      signInInfoData,
      bankAccounts,
      roles,
      users,
      pageData: { licenses, groups, banks, categories },
    });
  } catch (err) {
    res
      .status(200)
      .json({ success: false, totalRecords: 0, data: userProfiles[0].data });
  }
};

exports.addCompanyInfo = async ({ body }, res) => {
  //const companyInfo = new CompanyInfoModel(body);

  let companyInfoModel = {
    ...body,
    groupId: body.groupId ? body.groupId.value : "",
    businessType: body.businessType ? body.businessType.value : "",
    licenceTypeId: body.licenceTypeId ? body.licenceTypeId.value : "",
    erpService: body.erpService ? body.erpService.value : "",
  };
  let companyInfo = new userProfileModel(companyInfoModel);

  if (!companyInfo._id) {
    companyInfo._id = new require("mongoose").mongo.ObjectID();
  }
  // companyInfo.groupId = companyInfo.groupId.value;
  companyInfo.isActive = true;
  try {
    await userProfileModel.findOneAndUpdate(
      { _id: companyInfo._id },
      companyInfo,
      { upsert: true }
    );
    companyInfo = {
      ...companyInfo,
      groupId: body.groupId,
      businessType: body.businessType,
      licenceTypeId: body.licenceTypeId,
      erpService: body.erpService,
      companyName: companyInfo.company.english,
      companyNameAr: companyInfo.company.arabic,
      _id: companyInfo.id,
    };
    res.status(200).json({ success: true, data: companyInfo });
  } catch (err) {
    res.status(500).json({ success: false, message: err, data: companyInfo });
  }
};

exports.getUserProfiles = async (req, res) => {
  const userProfiles = await userProfileModel.aggregate([
    {
      $facet: {
        data: [
          {
            $skip:
              parseInt(req.params.page - 1) * parseInt(req.params.pageSize),
          },
          { $limit: parseInt(req.params.pageSize) },
          { $addFields: { _id: { $toString: "$_id" } } },
          /*    {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "userProfileId",
              as: "customer",
            },
          },
          { $match: { "customer.isAdmin": true } }, */

          {
            $lookup: {
              from: "users",
              let: {
                foreign_id: "$_id",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: [true, "$isAdmin"] },
                        { $eq: ["$userProfileId", "$$foreign_id"] },
                      ],
                    },
                  },
                },
              ],
              as: "customer",
            },
          },
          {
            $unwind: {
              path: "$customer",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "user_managements",
              localField: "_id",
              foreignField: "userProfileId",
              as: "userManagement",
            },
          },
          {
            $addFields: {
              noOfUsers: { $size: "$userManagement" },
            },
          },
        ],
        totalRecords: [{ $count: "totalRecords" }],
      },
    },
  ]);

  try {
    let data = userProfiles[0].data;
    data.forEach((item) => {
      if (item.userManagement) delete item.userManagement;
      if (!item.customer) return;
      item.userId = item.customer.userId;
      item.email = item.customer.email;
      item.phone = item.customer.phone;
      delete item.customer;
    });
    res.status(200).json({
      success: true,
      totalRecords: userProfiles[0].totalRecords[0].totalRecords,
      data: data,
    });
  } catch (err) {
    res
      .status(200)
      .json({ success: false, totalRecords: 0, data: userProfiles[0].data });
  }
};

exports.searchUserProfile = async ({ body }, res) => {
  const userProfiles = await userProfileModel.aggregate([
    {
      $facet: {
        data: [
          {
            $match: {
              $or: [
                {
                  "company.english": {
                    $regex: ".*" + body.search,
                    $options: "i",
                  },
                },
                {
                  licenceTypeId: { $regex: ".*" + body.search, $options: "i" },
                },
                { userId: { $regex: ".*" + body.search, $options: "i" } },
                { email: { $regex: ".*" + body.search, $options: "i" } },
                { phone: { $regex: ".*" + body.search, $options: "i" } },
              ],
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              results: { $push: "$$ROOT" },
            },
          },
          {
            $skip: parseInt(body.page - 1) * parseInt(body.pageSize),
          },
          { $limit: parseInt(body.pageSize) },
          { $addFields: { _id: { $toString: "$_id" } } },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "userProfileId",
              as: "customer",
            },
          },
          {
            $unwind: {
              path: "$customer",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "user_management",
              localField: "_id",
              foreignField: "userProfileId",
              as: "userManagement",
            },
          },
          {
            $addFields: {
              noOfUsers: { $size: "$userManagement" },
            },
          },
        ],
        totalRecords: [{ $count: "totalRecords" }],
      },
    },
  ]);
  try {
    let data = userProfiles[0].data[0].results;
    data.forEach((item) => {
      if (item.userManagement) delete item.userManagement;
      if (!item.customer) return;
      item.userId = item.customer.userId;
      item.email = item.customer.email;
      item.phone = item.customer.phone;
      delete item.customer;
    });
    res.status(200).json({
      success: true,
      totalRecords: userProfiles[0].data[0].count,
      data: data,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      totalRecords: 0,
      data: [],
    });
  }
};

module.exports = exports;
