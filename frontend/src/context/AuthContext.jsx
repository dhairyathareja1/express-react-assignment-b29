import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const savedToken = localStorage.getItem("token");
  const savedUsername = localStorage.getItem("username");
  const [user, setUser] = useState({
    token: savedToken,
    username: savedUsername,
  });

  function login(userData) {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("username", userData.username);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
