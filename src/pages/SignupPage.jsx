// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate for React Router v6

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before submitting

    // Basic form validation
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Simulate a successful signup
    // You can replace this with your API call to create the account
    try {
      // Here you would send the form data to your backend API
      // Example: await api.signup({ name, email, password });

      alert('Account created successfully!');
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      setError('Signup failed. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            className="border rounded p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            className="border rounded p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
