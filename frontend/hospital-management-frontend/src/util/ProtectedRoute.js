import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Element, roles, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles?.includes(user.role)) {
    console.log('User doesnt have proper role')
    return <Navigate to="/dashboard" />;

  }

  return <Element {...rest} />;
};

export default ProtectedRoute;
