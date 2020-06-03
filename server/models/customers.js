const mongoose = require("mongoose");

const customerSignInSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  phCode: {
    type: String,
    required: true,
  },
  twoStepVerification: {
    type: Boolean,
  //  required: true,
  },
  userProfileId: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
   // required: true,
  },
});

const customerSignIn = mongoose.model("Customers", customerSignInSchema);
module.exports = customerSignIn;
