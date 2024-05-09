const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Please enter your fullname"],
    trim: true,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    // validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    minlength: [6, "password must be of 6 characters"],
  },
  phone: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  userType: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
