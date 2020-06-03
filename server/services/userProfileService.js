const licenseModel = require("../models/licenses");
const groupsModel = require("../models/groups");
const BanksModel = require("../models/banks");
const categoriesModel = require("../models/CategoryMaster");
const UserProfileModel = require("../models/userProfile");
const mongoose = require("mongoose");
const helper = require("../helper");

exports.getCreateUserPageData = async (profileId) => {
  /*  let [licenses, groups,banks,categories] = await Promise.all([licenseModel.find({}), 
        groupsModel.find({}),
        BanksModel.find({}),
        categoriesModel.find({})
      ]); */
  let categoryMaster = categoriesModel.find({});
  if (profileId) {
    categoryMaster = (async () => {
      const userProfile = await UserProfileModel.findOne({
        _id: mongoose.Types.ObjectId(profileId),
      });
      const licence = await licenseModel.findOne({
        _id: userProfile.licenceTypeId,
      });
      let moduleIds = licence.modules.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
      const cat = await categoriesModel.aggregate([
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
      return cat[0].data;
    })();
  }
  let [licenses, groups, banks, categories] = await Promise.all([
    (async () => {
      const licenseArr = await licenseModel.find({});
      const licenseObj = licenseDataMappedWithId(licenseArr);
      //return Promise.resolve(licenseObj);
      return licenseObj;
    })(),
    (async () => {
      const groupsArr = await groupsModel.find({});
      const groupsObj = groupsDataMappedWithId(groupsArr);
      // return Promise.resolve(groupsObj);
      return groupsObj;
    })(),
    (async () => {
      const banksArr = await BanksModel.find({});
      const banksObj = banksDataMappedWithId(banksArr);
      // return Promise.resolve(groupsObj);
      return banksObj;
    })(),
    categoryMaster,
  ]);

  return Promise.resolve({ licenses, groups, banks, categories });
};

const licenseDataMappedWithId = (modelData) => {
  return modelData.reduce((result, data) => {
    const selectData = {
      label: data.licenseName,
      value: data._id,
      licenseName: data.licenseName,
    };
    //result[data._id] = data;
    result[data._id] = selectData;
    //  result.idMapped[data._id] = selectData;
    //select values for react-select
    // result.reactSelectArray.push(selectData);
    return result;
  }, {});
};

const groupsDataMappedWithId = (modelData) => {
  return modelData.reduce((result, data) => {
    const selectData = {
      label: data.value.english,
      value: data._id,
      groupName: data.value.english,
    };
    //result[data._id] = data;
    result[data._id] = selectData;
    return result;
  }, {});
};
const banksDataMappedWithId = (modelData) => {
  return modelData.reduce((result, data) => {
    let selectData = {
      label: data.bank,
      value: data._id,
      bankName: data.bank,
    };
    //result[data._id] = data;
    result[data._id] = selectData;
    return result;
  }, {});
};

const dataMappedWithId = (modelData) => {
  return modelData.reduce(
    (result, data) => {
      //result[data._id] = data;
      result.idMapped[data._id] = data;
      //select values for react-select
      result.reactSelectArray.push({ label: "label", value: "value" });
      return result;
    },
    { idMapped: {}, reactSelectArray: [] }
  );
};

exports.sendPasswordMail = (email, token) => {
  let mailHtml = `
      <p>Hi there.We're confirming that...</p>
      <p> Your one single view account has been created.Please find the one time password for first login 
                and choose your own password</p>
                <h3>One time  password:</h3>
              <h4>  ${token}</h4>
             <p>We'll always let you know when there is an activity on your account.This helps keep 
                      your account safe.</p>
                      
                <p> If you didn't make this request,contact us.</p>
                  
                 <p>  Thanks,</p>
                 <p> Singleview Team</p> 
              
              `;
  helper.sendMail(email, "Registration Successfull", mailHtml);
};

module.exports = exports;
