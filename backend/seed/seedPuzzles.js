require("dotenv").config();

const mongoose = require("mongoose");
const Puzzle = require("../models/Puzzle");
const puzzles = [
  {
    description:
      "Two broken galaxies meet in a support group orbit, where borrowed time feels heavier than the universe itself. Love blooms quietly, even while the clock refuses to stop ticking.",
    hint: "Shailene Woodley and Ansel Elgort carry a love story written in borrowed time.",
    difficulty: "Medium",
    answer: "The Fault in Our Stars",
  },

  {
    description:
      "A boy is bitten by destiny and suddenly the city’s silence starts talking back. Heights become home, and responsibility arrives wearing a mask he didn’t choose.",
    hint: "Andrew Garfield swings through responsibility and heartbreak.",
    difficulty: "Easy",
    answer: "The Amazing Spider-Man",
  },

  {
    description:
      "An old ghost returns to the sky where speed is prayer and silence is survival. The past sits in the cockpit, refusing to eject.",
    hint: "Tom Cruise returns where danger feels like home.",
    difficulty: "Hard",
    answer: "Top Gun: Maverick",
  },

  {
    description:
      "Sharp minds trade secrets like currency in glass towers where truth is optional but confidence is law. Everyone is guilty—some just dress better.",
    hint: "Harvey Specter never loses confidence.",
    difficulty: "Hard",
    answer: "Suits",
  },

  {
    description:
      "She arrives like sunlight in a room that forgot mornings exist. He teaches her endings while she tries to teach him reasons to stay.",
    hint: "Emilia Clarke changes Sam Claflin’s world one moment at a time.",
    difficulty: "Medium",
    answer: "Me Before You",
  },

  {
    description:
      "A man runs through locked doors that were never meant to open, collecting impossible tasks like they are apologies he must keep making.",
    hint: "Tom Cruise keeps running from explosions and impossible odds.",
    difficulty: "Easy",
    answer: "Mission Impossible",
  },

  {
    description:
      "Two storms collide in human form, pretending chaos is just another language for affection. Love here doesn’t arrive—it crashes.",
    hint: "Dylan Sprouse and Virginia Gardner turn chaos into romance.",
    difficulty: "Medium",
    answer: "Beautiful Disaster",
  },

  {
    description:
      "Two hearts share borrowed rooms and temporary dreams in a city that never asks for permanence. Love exists, but so does the departure gate.",
    hint: "Aditya Roy Kapur and Shraddha Kapoor chase love through Mumbai.",
    difficulty: "Medium",
    answer: "Ok Jaanu",
  },

  {
    description:
      "A fading voice finds refuge in another’s devotion, but fame and fragility pull the melody apart. Love becomes louder than success, and heavier than silence.",
    hint: "Aditya Roy Kapur loses himself while Shraddha Kapoor rises.",
    difficulty: "Easy",
    answer: "Aashiqui 2",
  },

  {
    description:
      "A retired clock learns new rhythms inside a world that runs too fast to notice wisdom walking in quietly. Age becomes an advantage disguised as experience.",
    hint: "Robert De Niro proves experience ages better than ambition.",
    difficulty: "Easy",
    answer: "The Intern",
  },

  {
    description:
      "Two people rehearse indifference so convincingly that even the universe starts laughing at them. Love hides behind sarcasm, waiting for the script to slip.",
    hint: "Sydney Sweeney and Glen Powell pretend a little too well.",
    difficulty: "Medium",
    answer: "Anyone But You",
  },

  {
    description:
      "Two strangers carry wounds stitched under uniforms and melodies, pretending the arrangement is temporary until emotions begin breaking contract terms.",
    hint: "A love story carried by music, sacrifice, and Ahaan Panday.",
    difficulty: "Medium",
    answer: "Saiyaara",
  },

  {
    description:
      "A boy mistakes memories for destiny while seasons keep proving that love and timing are rarely loyal to each other.",
    hint: "Joseph Gordon-Levitt spends 500 days chasing Zooey Deschanel.",
    difficulty: "Hard",
    answer: "500 Days of Summer",
  },

  {
    description:
      "A marriage born from necessity slowly learns how to breathe like something real. Distance, duty, and music keep testing what survives.",
    hint: "Nicholas Galitzine and Sofia Carson fall in love between sacrifice and songs.",
    difficulty: "Medium",
    answer: "Purple Hearts",
  },

  {
    description:
      "A journey meant to end quietly becomes a rebellion wrapped in mustard fields, stolen moments, and a train that refuses to leave hearts behind.",
    hint: "Shah Rukh Khan waits at the train one last time.",
    difficulty: "Easy",
    answer: "Dilwale Dulhania Le Jayenge",
  },
];

async function seedPuzzles() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Puzzle.deleteMany();

    await Puzzle.insertMany(puzzles);

    console.log("Puzzles added");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedPuzzles();
