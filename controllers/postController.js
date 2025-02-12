const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create({ userId: req.user.id, text: req.body.text });
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
    await post.save();
    res.json({ message: "Liked" });
  } else {
    res.status(400).json({ message: "Already liked" });
  }
};
