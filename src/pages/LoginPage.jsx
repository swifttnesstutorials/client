// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Fetch user credentials from localStorage
    const savedUser = JSON.parse(localStorage.getItem('user'));

    // Check if the provided credentials match the saved ones
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      // Call login function and navigate to the desired page
      login(email, 'user'); // Set role as 'user' or 'admin' based on your needs
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo);
    } else {
      setError('Failed to login. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      
      {/* Login Form */}
      <form onSubmit={handleLogin} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Profile Button (Only displayed if user is logged in) */}
      {user && (
        <div className="mt-4 text-center">
          <Link to="/profile">
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Profile
            </button>
          </Link>
        </div>
      )}

      {/* Sign-up Link */}
      <p className="mt-4 text-center">
        Don’t have an account? <Link to="/signup" className="text-blue-500">Create Account</Link>
      </p>
    </div>
  );
};

export default LoginPage;
