import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, roles }) => {
  const userRole = localStorage.getItem('role');

  const isAuthorized = roles.includes(userRole);

  return isAuthorized ? <Component /> : <Navigate to="/" />; // Redirect to home if not authorized
};

export default ProtectedRoute;