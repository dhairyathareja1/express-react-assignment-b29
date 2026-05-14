const User = require("../models/User");

exports.getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      solvedPuzzles: user.solvedPuzzles,
      score: user.score,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting progress",
    });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find();
    users.sort((a, b) => b.score - a.score);
    const topUsers = users.slice(0, 10);
    res.json(topUsers);
  } catch (error) {
    res.status(500).json({
      message: "Error getting leaderboard",
    });
  }
};
