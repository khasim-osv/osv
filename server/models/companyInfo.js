const mongoose = require("mongoose");

const CompanyInfoSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  companyNameAr: {
    type: String,
    required: true
  },
  //group: mongoose.Schema.Types.ObjectId,
  group: String, // not ObjectId to avoid cases if group is sent empty
  address: String,
  businessType: String,
  license: {
    type: String,
    required: true
  },
  ERP: String
});

const CompanyInfoModel = mongoose.model("CompanyInfo", CompanyInfoSchema, "CompanyInfo");
module.exports = CompanyInfoModel;
