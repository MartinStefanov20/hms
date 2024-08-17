import React from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();
  console.log('Protected Route', user, Element)
  return user ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;