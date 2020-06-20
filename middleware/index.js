const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }

  if (!token || !authorization) {
    return res
      .status(401)
      .json({ status: "Failed", message: "Not Authorized or logged in" });
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  ).catch((error) => {
    return res.status(401).json({
      status: "Failed",
      message: "You seem to be an unwanted guest. Login again to continue",
      error,
    });
  });

  if (!decoded)
    return res.status(401).json({
      status: "Failed",
      message: "You seem to be an unwanted guest. Login again to continue",
    });
  const { _id } = decoded;
  const presentUser = await User.findById(_id);

  if (!presentUser)
    return res.status(401).json({
      status: "Failed",
      message: "You seem to be an unwanted guest. Login again to continue",
    });
  req.user = presentUser;
  return next();
};
