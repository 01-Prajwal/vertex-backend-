// models/UserActivity.js
const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["save", "unsave", "share", "report"], required: true },
  contentId: { type: String, required: true },
  contentTitle: { type: String }, // 🆕 Add this field
  contentType: { type: String, enum: ["twitter", "reddit"], required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserActivity", userActivitySchema);
