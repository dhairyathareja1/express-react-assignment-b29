import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GamePage from "./pages/GamePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import useAuth from "./context/useAuth";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (user && user.token) {
    return children;
  }
  return <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/game"
          element={
            <PrivateRoute>
              <GamePage />
            </PrivateRoute>
          }
        />

        <Route path="/leaderboard" element={<LeaderboardPage />} />

        <Route path="*" element={<Navigate to="/game" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
