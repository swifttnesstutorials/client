import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'; // Assuming useAuth is used for authentication
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth(); // Access the logged-in user and function to update
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [email, setEmail] = useState(user.email || '');
  
  // Handle form submission to update user data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (ensure fields are not empty)
    if (!name || !phone || !email) {
      toast.error('Please fill all fields.');
      return;
    }

    const updatedUser = {
      name,
      phone,
      email
    };

    // Call the function to update the user (you may need to call an API for this)
    try {
      await updateUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile. Please try again later.');
    }
  };

  useEffect(() => {
    // Update states with current user data on initial load
    setName(user.name || '');
    setPhone(user.phone || '');
    setEmail(user.email || '');
  }, [user]);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Phone Input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Email Input (disabled for edit, as it's typically not editable) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
