const express = require("express");
const groupsModel = require("../models/groups");
const app = express();

app.get("/groups/:page/:pageSize", async (req, res) => {
  const groups = await groupsModel.aggregate([
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
        //totalRecords: [{ $count: "totalRecords" }],
      },
    },
  ]);

  try {
    res.status(200).json({
      success: true,
      totalRecords: groups[0].data[0].count,
      data: groups[0].data[0].results,
    });
  } catch (err) {
    res
      .status(200)
      .json({ success: false, totalRecords: 0, data: groups[0].data });
  }
});

app.post("/groups", async ({ body }, res) => {
  const groups = new groupsModel(body);
  try {
    await groups.save();
    res.status(200).json({ success: true, data: groups });
  } catch (err) {
    res.status(500).json({ success: false, message: err, data: groups });
  }
});

app.put("/groups/:id", async (req, res) => {
  try {
    await groupsModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ success: true, data: req.body });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something wrong with the API...!",

      data: req.body,
    });
  }
});

app.delete("/groups/:id", async (req, res) => {
  const groups = await groupsModel.findByIdAndDelete(req.params.id);
  try {
    !groups
      ? res.status(404).json({ success: false, data: groups })
      : res.status(200).json({ success: true, data: groups });
  } catch (err) {
    res.status(500).json({ success: false, data: groups });
  }
});

app.post("/groups/search", async ({ body }, res) => {
  const groups = await groupsModel.find({
    $or: [
      { "value.english": { $regex: ".*" + body.search, $options: "i" } },
      { "value.arabic": { $regex: ".*" + body.search, $options: "i" } },
      { key: { $regex: ".*" + body.search, $options: "i" } },
    ],
  });
  try {
    groups.length === 0
      ? res.status(404).json({ success: false, data: groups })
      : res.status(200).json({ success: true, data: groups });
  } catch (err) {
    res.status(500).json({ success: false, message: err, data: groups });
  }
});

module.exports = app;
