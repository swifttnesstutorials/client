// src/pages/SignupPage.jsx
// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Check if the user already exists
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      setError('User already registered, please log in.');
      return;
    }

    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Create a user object and save it to localStorage
    const user = { name, email, password, role: 'user' }; // Default role is 'user', adjust if needed
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form onSubmit={handleSignup} className="mt-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mt-2">
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mt-2">
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
          Sign Up
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SignupPage;
