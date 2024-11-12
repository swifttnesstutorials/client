// src/pages/EditProfilePage.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const { user, updateUser } = useAuth(); // Assuming `updateUser` updates user info
  const navigate = useNavigate();

  // Initialize form fields with user details
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }

    // Update user in local storage (or make an API call if connected to a backend)
    const updatedUser = { ...user, name, email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    updateUser(updatedUser); // Updates user info in the auth context

    // Redirect to Profile page
    navigate('/profile');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <form onSubmit={handleSave} className="mt-4">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;

