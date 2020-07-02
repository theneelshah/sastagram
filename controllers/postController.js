const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");

exports.allUserPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const posts = await Post.find({ username: id })
    .populate("postedBy", "-__v -password -time")
    .select("-__v")
    .sort("-time");
  res.status(200).json({ status: "OK", message: "Posts Received", posts });
});

exports.allPosts = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 9;
  const skip = (page - 1) * limit;

  const posts = await Post.find({})
    .skip(skip)
    .limit(limit)
    .populate("postedBy", "-__v -password -time")
    .select("-__v")
    .sort("-time");

  res.status(200).json({
    status: "OK",
    message: "Posts received",
    totalPosts: posts.length,
    posts,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const { caption, image } = req.body;
  const { user } = req;
  const { name } = user;

  if (!caption || !image)
    return res
      .status(422)
      .json({ status: "Failed", message: "Enter all the fields" });

  const post = await Post.create({
    caption,
    image,
    postedBy: user,
    username: name,
  });
  if (post) {
    const returnPost = {
      name: user.name,
      email: user.email,
      post: { caption: post.caption, image: post.image },
    };
    return res
      .status(200)
      .json({ status: "OK", message: "Post Uploaded!", post: returnPost });
  }
});

exports.singlePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) res.status(401).json({ status: "Failed", message: "Not Found" });
  res.status(200).json({ status: "OK", message: "Post Found", post });
});
