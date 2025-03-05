// context/AuthContext.js
"use client"; // Required for client-side context
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Simulate login (replace with actual API call to your Express backend)
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setUser(data.user); // Assume your backend returns a user object
      localStorage.setItem('token', data.token); // Save JWT token
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data using the token (replace with your API)
      fetch('http://localhost:3001/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch(console.error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}