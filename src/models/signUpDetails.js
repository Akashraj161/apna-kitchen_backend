const mongoose = require("mongoose");

const userDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

const UserDetailsSignUp = new mongoose.model(
  "UserDetailsSignUp",
  userDetailSchema
);
module.exports = UserDetailsSignUp;
