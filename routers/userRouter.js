const express = require("express");
const { protect } = require("../middleware");
const {
  getUserByUserName,
  updateUser,
} = require("../controllers/userController");
const { signup, login } = require("../controllers/authController");

const userRouter = express.Router();

const allUsers = (req, res) => {
  res.json({ status: "Done", message: "All Users" });
};

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/loggedIn", protect, (req, res) => {
  res.status(200).json({ status: "OK", message: "Logged In" });
});

userRouter.route("/").get(protect, allUsers);
userRouter.route("/:user").get(getUserByUserName).put(protect, updateUser);

module.exports = userRouter;
