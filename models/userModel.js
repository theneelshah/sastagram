const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "name is required"] },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  time: { type: Date },
});

userSchema.pre("save", function (next) {
  this.time = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
