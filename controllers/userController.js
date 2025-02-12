const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { bio, profilePic } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { bio, profilePic },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.followUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  const targetUser = await User.findById(req.params.id);

  if (!targetUser || user.following.includes(targetUser.id)) {
    return res.status(400).json({ message: "Invalid operation" });
  }

  user.following.push(targetUser.id);
  targetUser.followers.push(user.id);
  await user.save();
  await targetUser.save();
  
  res.json({ message: "User followed" });
};
