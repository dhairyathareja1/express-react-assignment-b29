require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors({ origin: "https://localhost:5173" }));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/puzzles", require("./routes/puzzleRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port ${PORT}"));
