const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.updateUserCredits = async (req, res) => {
  const { userId, credits } = req.body;
  const user = await User.findByIdAndUpdate(userId, { credits }, { new: true });
  res.json(user);
};

exports.getUserStats = async (req, res) => {
  const topUsers = await User.find().sort({ credits: -1 }).limit(5);
  const totalUsers = await User.countDocuments();
  res.json({ totalUsers, topUsers });
};
