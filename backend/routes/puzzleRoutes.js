const express = require("express");
const router = express.Router();
const puzzleController = require("../controllers/puzzleController");
const protect = require("../middleware/authMiddleware");

router.get("/random", protect, puzzleController.getRandom);
router.post("/:id/solve", protect, puzzleController.solvePuzzle);

module.exports = router;
