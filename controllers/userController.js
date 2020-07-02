const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getUserByUserName = catchAsync(async (req, res, next) => {
  const username = req.params.user;
  const user = await User.findOne({ name: username });
  if (user)
    res.status(200).json({
      status: "OK",
      message: "User Found",
      user: { user: user.name, email: user.email },
    });
  else res.status(404).json({ status: "Not Found", message: "User not found" });
});
