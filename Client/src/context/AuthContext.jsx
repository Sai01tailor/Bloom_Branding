import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin"))
  );

  const login = (token, adminData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(adminData));
    setToken(token);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ token, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
