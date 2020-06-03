const express = require("express");
//const modulesModel = require("../models/modules");
const licensesModel = require("../models/licenses");
const categoriesModel = require("../models/CategoryMaster");
const app = express();

app.get("/licenses", async (req, res) => {
  try {
    let matchQuery = {
      $lookup: {
        from: "ModuleMaster",
        localField: "modules",
        foreignField: "_id",
        as: "modules_info",
      },
    };

    licensesModel.aggregate([matchQuery]).exec((err, licenses) => {
      //   modulesModel.aggregate([matchQuery]).exec((err, modules) => {
      if (err) {
        //  cb(err);
        res.status(500).json({ success: false, err });
      } else {
        res.status(200).json({ success: true, data: licenses });

        // cb();
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

app.post("/addLicense", async ({ body }, res) => {
  const license = new licensesModel(body);
  try {
    await license.save();
    res.status(200).json({ success: true, data: license });
  } catch (err) {
    res.status(500).json({ success: false, message: err, data: license });
  }
});

app.put("/licenses/:id", async (req, res) => {
  try {
    await licensesModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ success: true, data: req.body });
  } catch (err) {
    res.status(500).json({ success: false, data: req.body });
  }
});

app.get("/licenses/getAllModules", async (req, res) => {
  try {
    let matchQuery = {
      $lookup: {
        from: "ModuleMaster",
        // localField: "_id",
        // foreignField: "categoryId",
        let: { module: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$categoryId", "$$module"] }],
              },
              isActive: true,
            },
          },
        ],

        as: "modules",
      },
    };
    /*  let matchQuery = {"$lookup":
           {"from": "CategoryMaster",
           "localField": "categoryId",
           "foreignField": "_id",
           "as": "result"
          }};*/

    categoriesModel.aggregate([matchQuery]).exec((err, modules) => {
      //   modulesModel.aggregate([matchQuery]).exec((err, modules) => {
      if (err) {
        //  cb(err);
        res.status(500).json({ success: false, err });
      } else {
        res.status(200).json({ success: true, data: modules });

        // cb();
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

module.exports = app;
