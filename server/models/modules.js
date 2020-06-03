const mongoose = require("mongoose");

const ModulesSchema = mongoose.Schema({
  moduleName: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  Web: {
    type: Boolean,
    required: true,
  },
  Mobile: {
    type: Boolean,
    required: true,
  },
  App: {
    type: Boolean,
    required: true,
  },
  APIs: {
    type: Boolean,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryMaster",
  },
});

const Modules = mongoose.model("ModuleMaster", ModulesSchema, "ModuleMaster");
module.exports = Modules;
