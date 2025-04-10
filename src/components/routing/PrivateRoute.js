import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // If auth is still loading, show loading spinner
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  // Check if user is authenticated
  if (!isAuthenticated()) {
    // Redirect to login page, but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If there are required roles, check if user has at least one of them
  if (requiredRoles.length > 0) {
    const userRoles = user?.roles || [];
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
    
    // If user doesn't have required role, redirect to forbidden page
    if (!hasRequiredRole) {
      return <Navigate to="/forbidden" replace />;
    }
  }
  
  // If authenticated and has required roles (if any), render the children
  return children;
};

export default PrivateRoute;