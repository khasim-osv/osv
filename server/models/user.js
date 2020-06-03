const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
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
});

//generate hash
UserSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, 10); //10 salt  rounds
};

UserSchema.methods.isPasswordValid = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("Users", UserSchema);
module.exports = User;
