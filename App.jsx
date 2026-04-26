import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const [lev, setLev] = useState("");
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("");
  const [msg, setMsg] = useState("");
  const [hid, setHid] = useState("");
  const [pid, setPid] = useState("");
  const [wrong, setWrong] = useState(0);

  async function doSignup() {
    let res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: mail,
        password: pass,
      }),
    });

    let data = await res.json();
    alert(data.msg);

    setPage("login");
  }

  async function doLogin() {
    let res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: mail,
        password: pass,
      }),
    });

    let data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      setPage("game");
    } else {
      alert(data.msg);
    }
  }

  async function getPuzzle() {
    setWrong(0);
    setMsg("");
    setHid("");

    let url = "/puzzle";

    if (lev !== "") {
      url = "/puzzle?level=" + lev;
    }

    let res = await fetch(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    let data = await res.json();

    setQ(data.text);
    setPid(data._id);
  }

  async function sendAns() {
    let res = await fetch("/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: pid,
        answer: ans,
      }),
    });

    let data = await res.json();

    setMsg(data.msg);

    if (data.correct === false) {
      setWrong(wrong + 1);
    } else {
      setAns("");
    }
  }

  async function getHint() {
    let res = await fetch("/hint/" + pid, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    let data = await res.json();

    setHid(data.hint);
  }

  function logout() {
    localStorage.removeItem("token");
    setPage("login");
  }

  return (
    <div className="main">
      <div className="box">
        <h1 className="title">Movie Guess</h1>

        {page === "login" && (
          <>
            <input
              placeholder="Email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />

            <button onClick={doLogin}>Login</button>

            <p className="small">
              No account?
              <span onClick={() => setPage("signup")}> Signup</span>
            </p>
          </>
        )}

        {page === "signup" && (
          <>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />

            <button onClick={doSignup}>Signup</button>

            <p className="small">
              Already user?
              <span onClick={() => setPage("login")}> Login</span>
            </p>
          </>
        )}

        {page === "game" && (
          <>
            <select value={lev} onChange={(e) => setLev(e.target.value)}>
              <option value="">All Levels</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <button onClick={getPuzzle}>Get Puzzle</button>

            <div className="question">{q}</div>

            <input
              placeholder="Enter movie name"
              value={ans}
              onChange={(e) => setAns(e.target.value)}
            />

            <button onClick={sendAns}>Submit</button>

            {wrong >= 3 && <button onClick={getHint}>Show Hint</button>}

            <div className="msg">{msg}</div>
            <div className="hint">{hid}</div>

            <button className="logout" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
