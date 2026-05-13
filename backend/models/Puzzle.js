const mongoose = require("mongoose");

const puzzleSchema = new mongoose.Schema({
  description: { type: String, required: true },
  answer: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  hint: { type: String, required: true },
});

module.exports = mongoose.model("Puzzle", puzzleSchema);
