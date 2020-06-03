const mongoose = require("mongoose");

const GroupsSchema = mongoose.Schema({
  isActive: {
    type: Boolean,
  },
  value: {
    english: {
      type: String,
      required: true,
    },
    arabic: {
      type: String,
      required: true,
    },
  },
});

const GroupsModel = mongoose.model("Groups", GroupsSchema, "Groups");
module.exports = GroupsModel;
