const Puzzle = require("../models/Puzzle");
const User = require("../models/User");

exports.getRandom = async (req, res) => {
  try {
    let difficulty = req.query.difficulty;
    let puzzles;

    if (difficulty) {
      puzzles = await Puzzle.find({ difficulty: difficulty });
    } else {
      puzzles = await Puzzle.find();
    }

    let randomIndex = Math.floor(Math.random() * puzzles.length);
    let randomPuzzle = puzzles[randomIndex];
    res.json(randomPuzzle);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching puzzle",
    });
  }
};

exports.solvePuzzle = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.solvedPuzzles.includes(req.params.id)) {
      return res.json({
        message: "Already solved",
      });
    }

    user.solvedPuzzles.push(req.params.id);
    user.score = user.score + 1;
    await user.save();
    res.json({
      message: "Puzzle solved",
      score: user.score,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error solving puzzle",
    });
  }
};
