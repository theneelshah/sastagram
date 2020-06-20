const express = require("express");
const { protect } = require("../middleware");
const { signup, login } = require("../controllers/authController");

const userRouter = express.Router();

const allUsers = (req, res) => {
  res.json({ status: "Done", message: "All Users" });
};

userRouter.post("/signup", signup);
userRouter.post("/login", login);

userRouter.route("/").get(protect, allUsers);

module.exports = userRouter;
