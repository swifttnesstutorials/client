// src/hooks/useAuth.js
// src/hooks/useAuth.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in (using localStorage)
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);  // Load saved user data from localStorage
    }
  }, []);

  const login = (email, role) => {
    const newUser = { email, role };  // user data includes email and role
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));  // Save user to localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');  // Remove user data from localStorage
  };

// New updateUser function to update user data
const updateUser = (updatedData) => {
  const updatedUser = { ...user, ...updatedData };  // Merge existing user data with updates
  setUser(updatedUser);  // Update the state
  localStorage.setItem('user', JSON.stringify(updatedUser));  // Save updated user to localStorage
};



  const isAuthenticated = !!user;  // Check if the user is logged in
  const isAdmin = user?.role === 'admin';  // Check if the user is an admin

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout,  updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
