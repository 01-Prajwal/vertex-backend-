const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  updateUserCredits,
  getUserStats
} = require("../controllers/adminController");

const router = express.Router();

router.use(authMiddleware, isAdmin);

router.get("/users", getAllUsers);
router.post("/update-credits", updateUserCredits);
router.get("/stats", getUserStats);

module.exports = router;
