const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
  caption: { type: String, required: [true, "Add a caption"] },
  image: { type: String, required: [true, "Upload an image"] },
  time: { type: Date },
  postedBy: { type: ObjectId, ref: "User" },
});

postSchema.pre("save", function (next) {
  this.time = Date.now();
  next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
