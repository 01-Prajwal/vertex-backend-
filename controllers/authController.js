const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password , name} = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, name });
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // Check last login time
    const now = new Date();
    const lastLogin = user.lastLogin || new Date(0); // default to epoch if never logged in
    const hoursDiff = (now - lastLogin) / (1000 * 60 * 60); // convert ms to hours

    if (hoursDiff >= 12) {
      user.credits += 1;
    }

    user.lastLogin = now;
    user.activityLog.push({ type: "login", timestamp: now });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        email: user.email,
        role: user.role,
        credits: user.credits,
        name: user.name,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

