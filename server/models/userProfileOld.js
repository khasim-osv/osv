const mongoose = require("mongoose");

const UserProfileSchema = mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  noOfUsers: {
    type: Number,
    required: true,
  },
  sPoc: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

const UserProfile = mongoose.model("UserProfiles", UserProfileSchema);
module.exports = UserProfile;
