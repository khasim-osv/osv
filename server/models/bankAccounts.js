const mongoose = require("mongoose");

const bankAccountSchema = mongoose.Schema({
  bankId: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userProfileId: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    //  required: true,
  },
});

const bankAccount = mongoose.model(
  "UserBankAccounts",
  bankAccountSchema,
  "UserBankAccounts"
);
module.exports = bankAccount;
