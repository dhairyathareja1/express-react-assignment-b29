const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.get("/progress", protect, userController.getProgress);
router.get("/leaderboard", userController.getLeaderboard);

module.exports = router;
