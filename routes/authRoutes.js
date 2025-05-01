const express = require("express");
const { register, login } = require("../controllers/authController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);

module.exports = router;
