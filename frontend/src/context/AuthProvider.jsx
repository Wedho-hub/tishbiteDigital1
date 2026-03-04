import React, { createContext, useContext, useState } from "react";
import { loginAdmin, logoutAdmin, fetchCsrfToken } from "../services/api";

// Create AuthContext
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await fetchCsrfToken();
      console.log('document.cookie before login:', document.cookie); // Debug CSRF cookie
      const res = await loginAdmin(email, password);
      if (res.success) setAdmin(res.admin);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutAdmin();
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use context
export const useAuth = () => useContext(AuthContext);