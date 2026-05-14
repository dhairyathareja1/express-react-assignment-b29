import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../context/useAuth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      login(response.data);
      navigate("/game");
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Login form */}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <br />
      <Link to="/signup">No account? Sign up</Link>
    </div>
  );
}

export default LoginPage;
