// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import DarkModelToggle from "./DarkModelToggle";


const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Spicy Gummies</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/menu" className="hover:text-gray-400">Menu</Link>
        <Link to="/restaurant" className="hover:text-gray-400">Restaurant</Link>
        <Link to="/cart" className="hover:text-gray-400">Cart</Link>
        <Link to="/login" className="hover:text-gray-400">Login</Link>
        <Link to="/signup" className="hover:text-gray-400">Signup</Link>
        <Link to="/payment" className="hover:text-gray-400">Payment</Link>
        <DarkModelToggle />
      </div>
    </nav>
  );
};

export default Navbar;
