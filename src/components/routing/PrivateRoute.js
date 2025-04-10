import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';
import authService from '../../services/authService';

const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    // Log authentication status for debugging
    console.log('Private Route Auth Status:', {
      isAuthenticated: isAuthenticated(),
      user,
      requiredRoles,
      currentLocation: location.pathname
    });
  }, [isAuthenticated, user, requiredRoles, location]);
  
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
    console.log('User not authenticated, redirecting to login');
    // Redirect to login page, but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If there are required roles, check if user has at least one of them
  if (requiredRoles.length > 0) {
    console.log('Required roles check:', { requiredRoles, userRoles: user?.roles });
    
    const hasRequiredRole = authService.hasAnyRole(requiredRoles);
    
    // If user doesn't have required role, redirect to forbidden page
    if (!hasRequiredRole) {
      console.log('User doesn\'t have the required role, redirecting to forbidden page');
      return <Navigate to="/forbidden" replace />;
    }
  }
  
  // If authenticated and has required roles (if any), render the children
  return children;
};

export default PrivateRoute;