import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../context/useAuth";

const hintLimit = 3;
function GamePage() {
  const { user, logout } = useAuth();
  const [puzzle, setPuzzle] = useState(null);
  const [guess, setGuess] = useState("");
  const [wrongCount, setWrongCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [message, setMessage] = useState("");
  const [difficulty, setDifficulty] = useState("");

  async function fetchPuzzle() {
    try {
      let url = "/puzzles/random";
      if (difficulty) {
        url = "/puzzles/random?difficulty=" + difficulty;
      }

      const response = await api.get(url);

      setPuzzle(response.data);
      setGuess("");
      setWrongCount(0);
      setShowHint(false);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPuzzle();
  }, [difficulty]);

  async function handleGuess() {
    if (guess.trim() === "") {
      return;
    }

    const userAnswer = guess.trim().toLowerCase();
    const correctAnswer = puzzle.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      try {
        await api.post("/puzzles/" + puzzle._id + "/solve");
        setMessage("Correct answer!");
        setTimeout(() => {
          fetchPuzzle();
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    } else {
      const newWrongCount = wrongCount + 1;
      setWrongCount(newWrongCount);
      setMessage("Wrong answer! Attempt " + newWrongCount);
    }
  }

  if (!puzzle) {
    return <p>Loading puzzle...</p>;
  }

  return (
    <div>
      {/* Navbar */}
      <nav>
        <h3>Welcome, {user.username}</h3>

        <Link to="/leaderboard">Leaderboard</Link>

        <br />
        <br />

        <button onClick={logout}>Logout</button>
      </nav>

      <hr />

      {/* Difficulty filter */}
      <select
        value={difficulty}
        onChange={(event) => {
          setDifficulty(event.target.value);
        }}
      >
        <option value="">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <br />
      <br />

      {/* Puzzle */}
      <h3>Difficulty: {puzzle.difficulty}</h3>

      <p>"{puzzle.description}"</p>

      {/* Guess input */}
      <input
        type="text"
        placeholder="Enter movie name"
        value={guess}
        onChange={(event) => {
          setGuess(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleGuess();
          }
        }}
      />

      <button onClick={handleGuess}>Guess</button>

      <br />
      <br />

      {/* Hint button */}
      {wrongCount >= hintLimit && (
        <button
          onClick={() => {
            setShowHint(true);
          }}
        >
          Show Hint
        </button>
      )}

      {/* Hint */}
      {showHint && <p>Hint: {puzzle.hint}</p>}

      {/* Message */}
      {message && <p>{message}</p>}

      <br />

      {/* Skip puzzle */}
      <button onClick={fetchPuzzle}>Skip Puzzle</button>
    </div>
  );
}

export default GamePage;
