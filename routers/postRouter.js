const express = require("express");
const { protect } = require("../middleware");
const {
  createPost,
  allPosts,
  allUserPost,
} = require("../controllers/postController");

const postRouter = express.Router();

postRouter.route("/").get(protect, allPosts).post(protect, createPost);

postRouter.route("/:id").get(allUserPost);

module.exports = postRouter;
