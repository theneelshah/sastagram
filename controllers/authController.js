const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = async (_id) =>
  await jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res
        .status(422)
        .json({ status: "Failed", message: "Please enter all the fields" });

    const savedUserEmail = await User.findOne({ email });
    const savedUserUsername = await User.findOne({ name });
    if (savedUserEmail) {
      return res.status(400).json({
        status: "Failed",
        message: "Email already exists. Use a unique email.",
      });
    }

    if (savedUserUsername) {
      return res.status(400).json({
        status: "Failed",
        message: "Username already exists. Use a unique username.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });

    if (user)
      return res
        .status(200)
        .json({ status: "OK", message: "User Created", user });
  } catch (err) {
    const { message } = err;
    res.status(400).json({
      status: "Failed",
      message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const savedUser = await User.findOne({ email });

    if (!savedUser)
      return res
        .status(401)
        .json({ status: "Failed", message: "Invalid user or password" });

    const present = await bcrypt.compare(password, savedUser.password);

    if (!present)
      return res
        .status(401)
        .json({ status: "Failed", message: "Invalid user or password" });

    const token = await signToken(savedUser._id);

    return res
      .status(200)
      .json({ status: "OK", message: "Logged in!", token, user: savedUser });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "Server Error", message: "Server Problem", err });
  }
};
