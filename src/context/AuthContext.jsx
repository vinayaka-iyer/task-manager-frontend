import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData) => {
    setToken(userData.token);
    const decoded = jwtDecode(token);
    setUser(decoded.userId);
    localStorage.setItem("token", userData.token); // Store token locally
    localStorage.setItem("user", decoded.userId); // Store user locally
  };

  // Fix so that user context isn't lost on reload
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(storedUser);
    }
}, []);


  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
