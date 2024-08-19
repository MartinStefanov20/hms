import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Element, roles, ...rest }) => {
  const { user, loading } = useAuth();

  // If still loading, you can return a loading indicator or null
  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loader component
  }

  // If not loading and no user, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles?.includes(user.role)) {
    console.log('User doesnt have proper role')
    return <Navigate to="/dashboard" />;

  }

  // If user exists, render the component
  return <Element {...rest} />;
};

export default ProtectedRoute;
