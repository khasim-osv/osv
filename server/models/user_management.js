const mongoose = require("mongoose");

const userManagementSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
  nationalId: {
    type: String,
    required: true,
  },
  fundTransferLimit: {
    currency: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  modulesCategory: [
    {
      categoryId: {
        type: String,
        required: true,
      },
      modules: [
        {
          moduleId: {
            type: String,
            required: true,
          },
          workflow: {
            type: String,
            required: false,
          },
          approval: {
            type: String,
            required: false,
          },
        },
      ],
    },
  ],
  userProfileId: {
    type: String,
    required: true,
  },
});

const userManagement = mongoose.model("user_managements", userManagementSchema);
module.exports = userManagement;
