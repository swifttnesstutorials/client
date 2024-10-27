// src/pages/LoginPage.jsx
import React from 'react';

const LoginPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input type="email" className="border rounded p-2 w-full" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input type="password" className="border rounded p-2 w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
