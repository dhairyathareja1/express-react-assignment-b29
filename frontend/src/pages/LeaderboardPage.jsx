import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    async function getLeaderboard() {
      try {
        const response = await api.get("/users/leaderboard");

        setLeaders(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getLeaderboard();
  }, []);

  return (
    <div className="leaderboard-page">
      <Link to="/game">Back to Game</Link>

      <h1>Leaderboard</h1>

      {leaders.length === 0 && <p>No leaderboard data found</p>}

      {leaders.map((user, index) => {
        return (
          <div className="leaderboard-card" key={user._id}>
            <h3>Rank #{index + 1}</h3>

            <p>Username: {user.username}</p>

            <p>Score: {user.score}</p>
          </div>
        );
      })}
    </div>
  );
}

export default LeaderboardPage;
