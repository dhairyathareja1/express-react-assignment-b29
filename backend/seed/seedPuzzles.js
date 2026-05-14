require("dotenv").config();

const mongoose = require("mongoose");
const Puzzle = require("../models/Puzzle");
const puzzles = [
  {
    description:
      "Two broken galaxies meet in a support group orbit, where borrowed time feels heavier than the universe itself. Love blooms quietly, even while the clock refuses to stop ticking.",
    hint: "A love story written in borrowed time and oxygen tanks.",
    difficulty: "Medium",
    answer: "The Fault in Our Stars",
  },

  {
    description:
      "A boy is bitten by destiny and suddenly the city’s silence starts talking back. Heights become home, and responsibility arrives wearing a mask he didn’t choose.",
    hint: "With great power comes a web of consequences.",
    difficulty: "Easy",
    answer: "The Amazing Spider-Man",
  },

  {
    description:
      "An old ghost returns to the sky where speed is prayer and silence is survival. The past sits in the cockpit, refusing to eject.",
    hint: "Still flying where others fear to go.",
    difficulty: "Hard",
    answer: "Top Gun: Maverick",
  },

  {
    description:
      "Sharp minds trade secrets like currency in glass towers where truth is optional but confidence is law. Everyone is guilty—some just dress better.",
    hint: "Close deals, open secrets.",
    difficulty: "Hard",
    answer: "Suits",
  },

  {
    description:
      "She arrives like sunlight in a room that forgot mornings exist. He teaches her endings while she tries to teach him reasons to stay.",
    hint: "Living changes meaning when someone else borrows your time.",
    difficulty: "Medium",
    answer: "Me Before You",
  },

  {
    description:
      "A man runs through locked doors that were never meant to open, collecting impossible tasks like they are apologies he must keep making.",
    hint: "Your mission, if you choose to accept it…",
    difficulty: "Easy",
    answer: "Mission: Impossible",
  },

  {
    description:
      "Two storms collide in human form, pretending chaos is just another language for affection. Love here doesn’t arrive—it crashes.",
    hint: "When danger looks like attraction.",
    difficulty: "Medium",
    answer: "Beautiful Disaster",
  },

  {
    description:
      "Two hearts share borrowed rooms and temporary dreams in a city that never asks for permanence. Love exists, but so does the departure gate.",
    hint: "Live-in love with an expiry date.",
    difficulty: "Medium",
    answer: "Ok Jaanu",
  },

  {
    description:
      "A fading voice finds refuge in another’s devotion, but fame and fragility pull the melody apart. Love becomes louder than success, and heavier than silence.",
    hint: "Fame rises, love falls.",
    difficulty: "Easy",
    answer: "Aashiqui 2",
  },

  {
    description:
      "A retired clock learns new rhythms inside a world that runs too fast to notice wisdom walking in quietly. Age becomes an advantage disguised as experience.",
    hint: "Experience never goes out of style.",
    difficulty: "Easy",
    answer: "The Intern",
  },

  {
    description:
      "Two people rehearse indifference so convincingly that even the universe starts laughing at them. Love hides behind sarcasm, waiting for the script to slip.",
    hint: "Enemies who forgot that they were acting.",
    difficulty: "Medium",
    answer: "Anyone But You",
  },
];

const seedPuzzles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    await Puzzle.deleteMany();
    console.log("Old puzzles deleted");
    await Puzzle.insertMany(puzzles);
    console.log("New puzzles added");
    process.exit();
  } catch (error) {
    console.log("Error seeding database");
    process.exit(1);
  }
};

seedPuzzles();
