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
    minlength: 8,
    required: [true, "Password is required"],
  },
  time: { type: Date },
  profilePicture: { type: String },
});

userSchema.pre("save", function (next) {
  this.time = Date.now();
  this.profilePicture =
    "https://res.cloudinary.com/sastagram/image/upload/v1593768176/user-profile-pngrepo-com_z6yhex.png";
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
