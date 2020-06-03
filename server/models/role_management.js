const mongoose = require("mongoose");

const roleManagementSchema = mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
  modulesCategory: [
    {
      _id: {
        type: String,
        required: true,
      },
      categoryName: {
        type: String,
        required: false,
      },
      modules: [
        {
          _id: {
            type: String,
            required: true,
          },
          moduleName: {
            type: Boolean,
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
  isActive: {
    type: Boolean,
    required: true,
  },
});

const roleManagement = mongoose.model("role_managements", roleManagementSchema);
module.exports = roleManagement;
