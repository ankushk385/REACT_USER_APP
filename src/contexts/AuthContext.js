import React, { createContext, useContext, useState, useEffect } from "react";

const KEY = "uma_auth_v1";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  function login(email, password) {
    if (email === "admin@example.com" && password === "admin123") {
      const u = { email };
      setUser(u);
      localStorage.setItem(KEY, JSON.stringify(u));
      return { ok: true };
    }
    return { ok: false, error: "Invalid credentials" };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
