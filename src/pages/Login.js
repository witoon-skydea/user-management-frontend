import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  CircularProgress,
  InputAdornment,
  IconButton,
  Link,
  Divider
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  LockOutlined as LockOutlinedIcon 
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Redirect URL from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Form validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
  });
  
  // Debug function to help diagnose login issues
  const debugLoginIssue = (error) => {
    console.log('Login Error Details:', {
      errorObject: error,
      errorResponse: error.response,
      errorData: error.response?.data,
      errorMessage: error.message
    });
    
    if (error.response?.status === 401) {
      return 'Invalid username or password. Please try again.';
    } else if (error.response?.status === 403) {
      return 'Your account is suspended or pending activation.';
    } else if (error.response?.status >= 500) {
      return 'Server error. Please try again later.';
    } else if (error.message.includes('Network Error')) {
      return 'Network error. Please check your internet connection.';
    }
    
    return error.response?.data?.message || 'Failed to login. Please check your credentials.';
  };
  
  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await login(values);
        console.log('Login successful:', result);
        
        // Verify authentication state before redirecting
        if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
          throw new Error('Authentication failed: Missing credentials in storage');
        }
        
        // Redirect to the page the user tried to access before
        navigate(from, { replace: true });
      } catch (err) {
        console.error('Login submission error:', err);
        setError(debugLoginIssue(err));
      } finally {
        setLoading(false);
      }
    },
  });
  
  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 128px)',
        py: 4,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Box
              sx={{
                bgcolor: 'primary.main',
                borderRadius: '50%',
                p: 1,
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LockOutlinedIcon sx={{ color: 'white' }} />
            </Box>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {location.state?.message && (
            <Alert severity="info" sx={{ mb: 3 }}>
              {location.state.message}
            </Alert>
          )}
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              Test account: testuser / Password123
            </Typography>
          </Box>
          
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              margin="normal"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              disabled={loading}
            />
            
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Link component={RouterLink} to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Box>
            
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link component={RouterLink} to="/register" variant="body2">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;