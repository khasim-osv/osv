const express = require("express");
const banksModel = require("../models/banks");
const app = express();
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//will be using this for uplading
const upload = multer({ storage: storage });

app.get("/banks/:page/:pageSize", async (req, res) => {
  const banks = await banksModel.aggregate([
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
      totalRecords: banks[0].data[0].count,
      data: banks[0].data[0].results,
    });
  } catch (err) {
    res
      .status(200)
      .json({ success: false, totalRecords: 0, data: banks[0].data });
  }
});
app.post("/banks", upload.single("file"), async (req, res) => {
  //console.log(req.body);
  //console.log("storage location is ", req.hostname + "/" + req.file.path);
  //let body = req.body;
  //body.logo = req.file.path;
  //let body = { ...req.body.data };
  //console.log(JSON.parse(body.data).type);
  let data = JSON.parse(req.body.data);
  data.logo = "/" + req.file.path.replace(/\\/g, "/");
  const banks = new banksModel(data);
  try {
    await banks.save();
    res.status(200).json({ success: true, data: banks });
  } catch (err) {
    res.status(500).json({ success: false, message: err, data: banks });
  }
});

app.put("/banks/:id", async (req, res) => {
  try {
    await banksModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ success: true, data: req.body });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something wrong with the API...!",

      data: req.body,
    });
  }
});

app.delete("/banks/:id", async (req, res) => {
  const banks = await banksModel.findByIdAndDelete(req.params.id);
  try {
    !banks
      ? res.status(404).json({ success: false, data: banks })
      : res.status(200).json({ success: true, data: banks });
  } catch (err) {
    res.status(500).json({ success: false, data: banks });
  }
});

app.post("/banks/search", async ({ body }, res) => {
  const banks = await banksModel.find({
    $or: [{ bank: { $regex: ".*" + body.search, $options: "i" } }],
  });
  try {
    banks.length === 0
      ? res.status(404).json({ success: false, data: banks })
      : res.status(200).json({ success: true, data: banks });
  } catch (err) {
    res.status(500).json({ success: false, message: err, data: banks });
  }
});

module.exports = app;
