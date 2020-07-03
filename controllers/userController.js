const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getUserByUserName = catchAsync(async (req, res, next) => {
  const username = req.params.user;
  const user = await User.findOne({ name: username });
  if (user)
    res.status(200).json({
      status: "OK",
      message: "User Found",
      user: {
        user: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  else res.status(404).json({ status: "Not Found", message: "User not found" });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { profilePicture } = req.body;
  const username = req.params.user;

  const updated = await User.updateOne({ name: username }, { profilePicture });
  if (updated.nModified === 1)
    res.status(201).json({ status: "OK", message: "Done" });
  else res.status(500).json({ status: "Failed", message: "Failed" });
});
