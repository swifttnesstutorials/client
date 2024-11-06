// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Spicy Gummies</Link>
        <div>
          <Link to="/" className="mx-2">Home</Link>
          <Link to="/menu" className="mx-2">Menu</Link>
          {isAuthenticated ? (
            <>
              {isAdmin && <Link to="/add-food" className="mx-2">Add Food</Link>}
              <Link to="/cart" className="mx-2">Cart</Link>
          
              <button onClick={logout} className="mx-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mx-2">Login</Link>
              <Link to="/signup" className="mx-2">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;