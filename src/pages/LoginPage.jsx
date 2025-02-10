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

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user by email and password
    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (foundUser) {
      login(email, foundUser.role); // Ensure role is used correctly
      localStorage.setItem('currentUser', JSON.stringify(foundUser)); // Store the current user
      navigate(location.state?.from || '/'); // Redirect to the desired page
    } else {
      setError('Failed to login. Please check your credentials.');
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <form onSubmit={handleLogin} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
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

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {user && (
        <div className="mt-4 text-center">
          <Link to="/profile">
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Profile
            </button>
          </Link>
        </div>
      )}

      <p className="mt-4 text-center">
        Don’t have an account? <Link to="/signup" className="text-blue-500">Create Account</Link>
      </p>
    </div>
  );
};

export default LoginPage;
