const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { interactWithFeed } = require("../controllers/feedController");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const router = express.Router();

// Existing authenticated interaction route
router.post("/interact", authMiddleware, interactWithFeed);

// New route: Proxy to Twitter API
router.get("/twitter", async (req, res) => {
  try {
    const query = req.query.q || "technology"; // Allow query override via URL
    const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(
      query
    )}&max_results=10`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching Twitter data:", error);
    res.status(500).json({ error: "Failed to fetch Twitter data" });
  }
});

module.exports = router;
