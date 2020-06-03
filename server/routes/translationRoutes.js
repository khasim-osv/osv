const express = require("express");
const translationModel = require("../models/translation");
const app = express();

app.get("/translations/:page/:pageSize", async (req, res) => {
  const translations = await translationModel.aggregate([
    {
      $facet: {
        data: [
          {
            $skip:
              parseInt(req.params.page - 1) * parseInt(req.params.pageSize),
          },
          { $limit: parseInt(req.params.pageSize) },
        ],
        totalRecords: [{ $count: "totalRecords" }],
      },
    },
  ]);

  try {
    res.status(200).json({
      success: true,
      totalRecords: translations[0].totalRecords[0].totalRecords,
      data: translations[0].data,
    });
  } catch (err) {
    res
      .status(200)
      .json({ success: false, totalRecords: 0, data: translations[0].data });
  }
});

app.post("/translations", async ({ body }, res) => {
  const translations = new translationModel(body);
  try {
    await translations.save();
    res.status(200).json({ success: true, data: translations });
  } catch (err) {
    res.status(200).json({ success: false, message: err, data: translations });
  }
});

app.put("/translations/:id", async (req, res) => {
  try {
    await translationModel.findByIdAndUpdate(req.params.id, req.body, {
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

app.delete("/translations/:id", async (req, res) => {
  const translations = await translationModel.findByIdAndDelete(req.params.id);
  try {
    !translations
      ? res.status(200).json({ success: false, data: translations })
      : res.status(200).json({ success: true, data: translations });
  } catch (err) {
    res.status(200).json({ success: false, data: translations });
  }
});

app.post("/translations/search", async ({ body }, res) => {
  const translations = await translationModel.aggregate([
    {
      $match: {
        $or: [
          { "value.english": { $regex: ".*" + body.search, $options: "i" } },
          { "value.arabic": { $regex: ".*" + body.search, $options: "i" } },
          { key: { $regex: ".*" + body.search, $options: "i" } },
        ],
      },
    },
    {
      $facet: {
        data: [
          {
            $skip: parseInt(body.page - 1) * parseInt(body.pageSize),
          },
          { $limit: parseInt(body.pageSize) },
        ],
        totalRecords: [{ $count: "totalRecords" }],
      },
    },
  ]);
  try {
    translations.length === 0
      ? res
          .status(200)
          .json({ success: false, totalRecords: 0, data: translations[0].data })
      : res.status(200).json({
          success: true,
          totalRecords: translations[0].totalRecords[0].totalRecords,
          data: translations[0].data,
        });
  } catch (err) {
    res.status(200).json({
      success: false,
      totalRecords: 0,
      message: err,
      data: translations,
    });
  }
});

module.exports = app;
