const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");
const Puzzle = require("./models/Puzzle");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.env)
  .then(function () {
    console.log("mongo connected");
  })
  .catch(function () {
    console.log("db error");
  });

app.get("/", function (req, res) {
  res.send("backend running");
});

app.post("/signup", async function (req, res) {
  let data = req.body;

  let oldUser = await User.findOne({
    email: data.email,
  });

  if (oldUser) {
    return res.json({
      msg: "Email already exists",
    });
  }

  let hashPass = await bcrypt.hash(data.password, 10);

  let user = new User({
    name: data.name,
    email: data.email,
    password: hashPass,
    solved: [],
  });

  await user.save();

  res.json({
    msg: "Signup successful",
  });
});

app.post("/login", async function (req, res) {
  let data = req.body;

  let user = await User.findOne({
    email: data.email,
  });

  if (!user) {
    return res.json({
      msg: "User not found",
    });
  }

  let same = await bcrypt.compare(data.password, user.password);

  if (!same) {
    return res.json({
      msg: "Wrong password",
    });
  }

  let token = jwt.sign({ id: user._id }, process.env.SECRET);

  res.json({
    msg: "Login successful",
    token: token,
  });
});

function check(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return res.json({
      msg: "Login first",
    });
  }

  try {
    let data = jwt.verify(token, process.env.SECRET);

    req.user = data;

    next();
  } catch {
    res.json({
      msg: "Wrong token",
    });
  }
}

app.get("/puzzle", check, async function (req, res) {
  let level = req.query.level;

  let arr;

  if (level) {
    arr = await Puzzle.find({
      level: level,
    });
  } else {
    arr = await Puzzle.find();
  }

  if (arr.length == 0) {
    return res.json({
      msg: "No puzzle found",
    });
  }

  let num = Math.floor(Math.random() * arr.length);

  res.json(arr[num]);
});

app.post("/answer", check, async function (req, res) {
  let pid = req.body.id;
  let ans = req.body.answer;

  let puzzle = await Puzzle.findById(pid);

  if (!puzzle) {
    return res.json({
      msg: "Puzzle not found",
    });
  }

  if (puzzle.answer.toLowerCase().trim() == ans.toLowerCase().trim()) {
    let user = await User.findById(req.user.id);

    if (!user.solved.includes(pid)) {
      user.solved.push(pid);
      await user.save();
    }

    return res.json({
      correct: true,
      msg: "Correct",
    });
  }

  res.json({
    correct: false,
    msg: "Wrong",
  });
});

/* hint */

app.get("/hint/:id", check, async function (req, res) {
  let id = req.params.id;

  let puzzle = await Puzzle.findById(id);

  if (!puzzle) {
    return res.json({
      msg: "Puzzle not found",
    });
  }

  res.json({
    hint: puzzle.hint,
  });
});

/* start */

app.listen(5000, function () {
  console.log("server started on port 5000");
});
