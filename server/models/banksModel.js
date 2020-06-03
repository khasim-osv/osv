const mongoose = require("mongoose");

const BanksSchema = mongoose.Schema({
  logo: {
    type: String,
  },
  bank: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  disable: {
    type: Boolean,
  },
});

const BanksModel = mongoose.model("Banks", BanksSchema, "Banks");
module.exports = BanksModel;
