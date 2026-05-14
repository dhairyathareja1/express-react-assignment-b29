import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../context/useAuth";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/auth/signup", {
        username: username,
        email: email,
        password: password,
      });
      login(response.data);
      navigate("/game");
    } catch (error) {
      console.log(error);
      setError("Signup failed");
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Signup form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <br />
        <br />

        <button type="submit">Sign Up</button>
      </form>

      <br />

      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}

export default SignupPage;
