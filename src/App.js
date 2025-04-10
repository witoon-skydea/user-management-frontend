import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// Theme
import theme from './styles/theme';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';

// Layout Components
import Layout from './components/layout/Layout';

// Route Protection
import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserHome from './pages/UserHome';
import UserProfile from './pages/UserProfile';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';

// Import global styles
import './styles/GlobalStyles.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public Routes */}
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forbidden" element={<Forbidden />} />
              
              {/* Admin Routes - Dashboard is now admin-only */}
              <Route path="dashboard" element={
                <PrivateRoute requiredRoles={['admin']}>
                  <Dashboard />
                </PrivateRoute>
              } />
              
              <Route path="user-home" element={
                <PrivateRoute>
                  <UserHome />
                </PrivateRoute>
              } />
              
              <Route path="profile" element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="users" element={
                <PrivateRoute requiredRoles={['admin']}>
                  <Dashboard />
                </PrivateRoute>
              } />
              
              <Route path="roles" element={
                <PrivateRoute requiredRoles={['admin']}>
                  <Dashboard />
                </PrivateRoute>
              } />
              
              <Route path="services" element={
                <PrivateRoute requiredRoles={['admin']}>
                  <Dashboard />
                </PrivateRoute>
              } />
              
              <Route path="audit-logs" element={
                <PrivateRoute requiredRoles={['admin']}>
                  <Dashboard />
                </PrivateRoute>
              } />
              
              {/* Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;