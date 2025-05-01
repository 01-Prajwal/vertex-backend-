// scripts/createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");


mongoose.connect("mongodb+srv://bhangesunny701:Sunny%405278@cluster0.o6j7be9.mongodb.net/")
  .then(async () => {
    const existing = await User.findOne({ email: "admin@example.com" });
    if (existing) {
      console.log("Admin already exists");
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "Admin"
    });

    await admin.save();
    console.log("Admin user created");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error creating admin:", err);
    process.exit(1);
  });
