// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="mb-2">Discover our passion for providing high-quality food delivered right to your door.</p>
        <div className="flex justify-center space-x-6">
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/terms" className="hover:underline">Terms & Policy</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          <Link to="/admin" className="hover:underline">Log in as Admin</Link>
        </div>
        <p className="mt-4">© 2024 Spicy Gummies. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

