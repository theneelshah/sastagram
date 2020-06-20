const express = require("express");
const { protect } = require("../middleware");
const {
  createPost,
  allPosts,
  userPost,
} = require("../controllers/postController");

const postRouter = express.Router();

postRouter.route("/").get(protect, allPosts).post(protect, createPost);

postRouter.route("/:id").get(protect, userPost);

module.exports = postRouter;
