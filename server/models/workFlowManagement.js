const mongoose = require("mongoose");

const workFlowManagementSchema = mongoose.Schema({
  approvalLimit: {
    currencyCode: {
      type: String,
      required: false,
    },
    maxLimit: {
      type: Number,
      required: false,
    },
    workflow: [
      {
        type: String,
        required: false,
      },
    ],
  },
  userProfileId: {
    type: String,
    required: true,
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
          workflow: [
            {
              type: String,
              required: false,
            },
          ],
        },
      ],
    },
  ],
});

const workFlowManagement = mongoose.model(
  "WorkflowManagement",
  workFlowManagementSchema,
  "WorkflowManagement"
);
module.exports = workFlowManagement;
