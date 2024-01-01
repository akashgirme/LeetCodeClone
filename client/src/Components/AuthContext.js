import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("email");
    const token = localStorage.getItem("jwtToken");

    if (storedUser && token) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const token = localStorage.getItem("jwtToken");

  const login = (email) => {
    if (token) {
      setUser(email);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("email");
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    handleRefresh();
  };

  const handleRefresh = () => {
    window.location.reload(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
