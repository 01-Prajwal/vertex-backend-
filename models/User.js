// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
  credits: { type: Number, default: 0 },
  bio: { type: String, default: "" },
  occupation: { type: String, default: "" },
  profileCompleted: { type: Boolean, default: false },
  lastLogin: { type: Date },
  activityLog: [
    {
      type: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
