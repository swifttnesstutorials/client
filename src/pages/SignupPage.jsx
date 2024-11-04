// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(`Congrats, ${data.user.name}! Your account has been created.`);
      setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
    } else {
      setMessage(data.error || 'Error creating account. Please try again.');
    }
  };

  // Check if the user is authenticated by verifying the presence of a token
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Create Account</h1>
      {message && <p className="mt-2 text-green-600">{message}</p>}
      <form onSubmit={handleSignup} className="mt-4">
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full mt-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mt-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Sign Up</button>
      </form>

      {/* Conditionally render the "Edit Profile" button if the user is authenticated */}
      {isAuthenticated && (
        <button
          onClick={() => navigate('/edit-profile')}
          className="bg-green-500 text-white py-2 px-4 rounded mt-4"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default SignupPage;
