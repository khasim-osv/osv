const mongoose = require("mongoose");

const LicensesSchema = mongoose.Schema({
  licenseName: {
    type: String,
    required: true
  },
  modules: [mongoose.Schema.Types.ObjectId],
  noOfUsers: {
    type: String,
    required: true
  },
  noOfTransactions: {
    type: String,
    required: true
  }
});

const LicensesModel = mongoose.model("Licenses", LicensesSchema, "Licenses");
module.exports = LicensesModel;
