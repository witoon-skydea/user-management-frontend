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
  Link,
  Divider
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LockOpen as LockOpenIcon } from '@mui/icons-material';
import api from '../services/api';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });
  
  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      try {
        // In a real application, we would call the API
        // await api.post('/users/forgot-password', values);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSuccess(true);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to process request. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });
  
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
      <Card sx={{ maxWidth: 450, width: '100%', borderRadius: 2 }}>
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
              <LockOpenIcon sx={{ color: 'white' }} />
            </Box>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Enter your email address and we'll send you a link to reset your password.
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {success ? (
            <Alert severity="success" sx={{ mb: 3 }}>
              Password reset instructions have been sent to your email address. 
              Please check your inbox and follow the instructions to reset your password.
            </Alert>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                disabled={loading}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading || success}
              >
                {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
              </Button>
              
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  Remember your password?{' '}
                  <Link component={RouterLink} to="/login" variant="body2">
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;