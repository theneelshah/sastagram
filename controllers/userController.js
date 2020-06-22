const User = require("../models/userModel");

exports.getUserByUserName = async (req, res, next) => {
  try {
    const username = req.params.user;
    const user = await User.findOne({ name: username });
    if (user)
      res.status(200).json({
        status: "OK",
        message: "User Found",
        user: { user: user.name, email: user.email },
      });
    else
      res.status(404).json({ status: "Not Found", message: "User not found" });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "Error",
        message: "Internal Server Error",
        message: error.message,
      });
  }
};
