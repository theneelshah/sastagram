const Post = require("../models/postModel");

exports.userPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ postedBy: id })
      .populate("postedBy", "-__v")
      .select("-__v")
      .sort("-time");

    res.status(200).json({ status: "OK", message: "Posts Received", posts });
  } catch (error) {
    res
      .status(400)
      .json({ status: "Failed", message: "Error occured!", error });
  }
};

exports.allPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .populate("postedBy", "-__v")
      .select("-__v")
      .sort("-time");

    res.status(200).json({ status: "OK", message: "Posts received", posts });
  } catch (error) {
    res
      .status(400)
      .json({ status: "Failed", message: "Error occured!", error });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { caption, image } = req.body;
    const { user } = req;

    if (!caption || !image)
      return res
        .status(422)
        .json({ status: "Failed", message: "Enter all the fields" });

    const post = await Post.create({ caption, image, postedBy: user });
    if (post)
      return res
        .status(200)
        .json({ status: "OK", message: "Post Uploaded!", post });
  } catch (error) {
    return res.status(400).json({ status: "Failed", error });
  }
};
