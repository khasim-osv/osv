const express = require("express");
const modulesModel = require("../models/modules");
const categoriesModel = require("../models/CategoryMaster");
const app = express();

app.get("/modules/:page/:pageSize", async (req, res) => {
  const modules = await modulesModel.aggregate([
    {
      $facet: {
        data: [
          //{ $match: { isActive: true } },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              results: { $push: "$$ROOT" },
            },
          },
          {
            $skip:
              parseInt(req.params.page - 1) * parseInt(req.params.pageSize),
          },
          { $limit: parseInt(req.params.pageSize) },
        ],
      },
    },
  ]);

  try {
    res.status(200).json({
      success: true,
      totalRecords: modules[0].data[0].count,
      data: modules[0].data[0].results,
    });
  } catch (err) {
    res
      .status(200)
      .json({ success: false, totalRecords: 0, data: modules[0].data });
  }
});
app.post("/addModule", async ({ body }, res) => {
  const module = new modulesModel(body);
  try {
    await module.save();
    res.status(200).json({ success: true, data: module });
  } catch (err) {
    res.status(500).json({ success: false, message: err, data: module });
  }
});

app.put("/modules/:id", async (req, res) => {
  try {
    await modulesModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ success: true, data: req.body });
  } catch (err) {
    res.status(500).json({ success: false, data: req.body });
  }
});

app.get("/modules/getCategories", async (req, res) => {
  try {
    let categories = [];
    let data = await categoriesModel.find({});
    categories = data.map((ctgry) => {
      return { value: ctgry.id, label: ctgry.categoryName };
    });
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, data: [] });
  }
});

app.post("/addCategory", async ({ body }, res) => {
  const module = new categoriesModel(body);
  try {
    await module.save();
    res.status(200).json({ success: true, data: module });
  } catch (err) {
    res.status(500).json({ success: false, message: err, data: module });
  }
});

module.exports = app;
