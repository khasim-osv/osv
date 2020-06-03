const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  company: {
    english: {
      type: String,
      required: true,
    },
    arabic: {
      type: String,
      required: true,
    },
  },
  groupId: {
    type: String,
    //required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  businessType: {
    type: String,
    //  required: true,
  },
  licenceTypeId: {
    type: String,
    required: true,
  },
  erpService: {
    type: String,
    //  required: true,
  },
  communication: {
    type: Boolean,
    // required: true,
  },
  isActive: {
    type: Boolean,
    // required: true,
  },
  workflowManagement: {
    type: Object,
  },
});

const userProfile = mongoose.model("UserProfiles", userProfileSchema);
module.exports = userProfile;
