
const User = require("../models/User");
const { addCredit } = require("../utils/creditUtils");

exports.interactWithFeed = async (req, res) => {
  const { type } = req.body; // 'save', 'share', 'report'
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const earned = await addCredit(user, type);

    res.json({ message: `${type} recorded`, creditsEarned: earned });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
