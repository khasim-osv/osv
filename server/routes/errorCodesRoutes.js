const express = require("express");
const errorCodesModel = require("../models/errorCodes");
const app = express();

app.get("/errorCodes/:page/:pageSize", async (req, res) => {
  const errorCodes = await errorCodesModel.aggregate([
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
      totalRecords: errorCodes[0].data[0].count,
      data: errorCodes[0].data[0].results,
    });
  } catch (err) {
    res
      .status(200)
      .json({ success: false, totalRecords: 0, data: errorCodes[0].data });
  }
});
app.post("/errorCodes", async ({ body }, res) => {
  // const errorCodes = await errorCodesModel.find({
  //   $or: [{ errorcode: { $regex: ".*" + body.errorcode, $options: "i" } }],
  // });
  const errorCodes = new errorCodesModel(body);
  try {
    await errorCodes.save();
    res.status(200).json({ success: true, data: errorCodes });
  } catch (err) {
    res.status(500).json({ success: false, message: err, data: errorCodes });
  }
});

app.put("/errorCodes/:id", async (req, res) => {
  try {
    await errorCodesModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ success: true, data: req.body });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something wrong with the API...!",

      data: req.body,
    });
  }
});

app.delete("/errorCodes/:id", async (req, res) => {
  const errorCodes = await errorCodesModel.findByIdAndDelete(req.params.id);
  try {
    !errorCodes
      ? res.status(404).json({ success: false, data: errorCodes })
      : res.status(200).json({ success: true, data: errorCodes });
  } catch (err) {
    res.status(500).json({ success: false, data: errorCodes });
  }
});

app.post("/errorCodes/search", async ({ body }, res) => {
  const errorCodes = await errorCodesModel.find({
    $or: [
      { "value.english": { $regex: ".*" + body.search, $options: "i" } },
      { "value.arabic": { $regex: ".*" + body.search, $options: "i" } },
      { key: { $regex: ".*" + body.search, $options: "i" } },
    ],
  });
  try {
    errorCodes.length === 0
      ? res.status(404).json({ success: false, data: errorCodes })
      : res.status(200).json({ success: true, data: errorCodes });
  } catch (err) {
    res.status(500).json({ success: false, message: err, data: errorCodes });
  }
});

module.exports = app;
