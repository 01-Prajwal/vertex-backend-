const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");

const UserActivity = require("../models/UserActivity");
const User = require("../models/User");
const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  res.json({ message: "User route secured", user: req.user });
});
router.get("/activity", authMiddleware, async (req, res) => {
  try {
    const activities = await UserActivity.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .limit(20);
    res.json({ activities });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch activity", error: err.message });
  }
});
router.put("/complete-profile", authMiddleware, async (req, res) => {
  const { bio, occupation } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const wasIncomplete = !user.profileCompleted;
    user.bio = bio || user.bio;
    user.occupation = occupation || user.occupation;

    // Check if both fields now exist and profile wasn't marked completed
    if (wasIncomplete && user.bio && user.occupation) {
      user.profileCompleted = true;
      user.credits += 3;

      user.activityLog.push({
        type: "profile_completed",
      });
    }

    await user.save();

    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// POST new activity
router.post("/activity", authMiddleware, async (req, res) => {
  try {
    const { type, contentId, contentType,contentTitle } = req.body;
    const activity = new UserActivity({
      userId: req.user.id,
      type,
      contentId,
      contentTitle,
      contentType,
    });
    await activity.save();
    res.status(201).json({ message: "Activity recorded", activity });
  } catch (err) {
    res.status(500).json({ message: "Failed to record activity", error: err.message });
  }
});
module.exports = router;
