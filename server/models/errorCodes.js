const mongoose = require("mongoose");

const ErrorCodesSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  errorcode: {
    type: String,
    required: true,
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
  isActive: {
    type: Boolean,
  },
});

const ErrorCodesModel = mongoose.model("ErrorCodes", ErrorCodesSchema);
module.exports = ErrorCodesModel;
