import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("jwtToken");

  const login = (email) => {
    if (token) setUser(email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("email");
    localStorage.removeItem("jwtToken");
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
