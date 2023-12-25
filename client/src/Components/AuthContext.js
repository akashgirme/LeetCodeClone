import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const token = Cookies.get("jwtToken");

  const login = (email) => {
    if (token) setUser(email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("email");
    Cookies.remove("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
