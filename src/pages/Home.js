import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Container,
  Paper,
  Divider
} from '@mui/material';
import { 
  SupervisedUserCircle as SupervisedUserCircleIcon,
  Security as SecurityIcon,
  BusinessCenter as BusinessCenterIcon,
  History as HistoryIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Feature cards data
  const features = [
    {
      title: 'User Management',
      description: 'Create, update, and manage user accounts with complete control over user permissions and access.',
      icon: <SupervisedUserCircleIcon sx={{ fontSize: 60, color: '#0d47a1' }} />,
      linkTo: '/users',
      linkText: 'Manage Users'
    },
    {
      title: 'Role-Based Access Control',
      description: 'Define roles with specific permissions and assign them to users for granular access control.',
      icon: <SecurityIcon sx={{ fontSize: 60, color: '#0d47a1' }} />,
      linkTo: '/roles',
      linkText: 'Manage Roles'
    },
    {
      title: 'Service Integration',
      description: 'Connect and manage multiple services with seamless integration and user assignment.',
      icon: <BusinessCenterIcon sx={{ fontSize: 60, color: '#0d47a1' }} />,
      linkTo: '/services',
      linkText: 'Manage Services'
    },
    {
      title: 'Audit Logging',
      description: 'Track all user activities and system events with comprehensive audit trails.',
      icon: <HistoryIcon sx={{ fontSize: 60, color: '#0d47a1' }} />,
      linkTo: '/audit-logs',
      linkText: 'View Logs'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: '#0d47a1',
          color: '#fff',
          mb: 4,
          borderRadius: 2,
          overflow: 'hidden',
          py: { xs: 6, md: 8 },
          px: { xs: 3, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                User Management System
              </Typography>
              <Typography
                variant="h5"
                color="inherit"
                paragraph
                sx={{ opacity: 0.9, mb: 4 }}
              >
                Comprehensive solution for user, role, and service management
                with secure authentication and detailed audit logging.
              </Typography>
              
              {isAuthenticated() ? (
                <Button
                  component={Link}
                  to="/dashboard"
                  variant="contained"
                  size="large"
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#0d47a1',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <Box>
                  <Button
                    component={Link}
                    to="/login"
                    variant="contained"
                    size="large"
                    sx={{ 
                      bgcolor: 'white', 
                      color: '#0d47a1',
                      mr: 2,
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="outlined"
                    size="large"
                    sx={{ 
                      color: 'white', 
                      borderColor: 'white',
                      '&:hover': { 
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                        borderColor: 'white'
                      }
                    }}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img"
                src="/logo512.png"
                alt="User Management"
                sx={{ 
                  width: '100%',
                  maxWidth: 400,
                  display: 'block',
                  margin: '0 auto',
                  filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.2))'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Key Features
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Our user management system provides a complete solution for managing users, roles, and services
            with robust security features and detailed activity tracking.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ textAlign: 'center' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    component={Link} 
                    to={feature.linkTo} 
                    size="small" 
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ ml: 'auto', mr: 'auto' }}
                  >
                    {feature.linkText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                About This System
              </Typography>
              <Typography variant="body1" paragraph>
                Our User Management API provides a robust solution for handling user authentication, 
                authorization, and service integration in your applications.
              </Typography>
              <Typography variant="body1" paragraph>
                Built with modern technologies like Node.js, Express, MongoDB, and JWT, 
                this system ensures secure and scalable user management for your enterprise needs.
              </Typography>
              <Typography variant="body1">
                Whether you need to manage a few dozen users or scale to thousands, 
                our system provides the flexibility and security features you need.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Technology Stack
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2">• Node.js</Typography>
                    <Typography variant="body2">• Express.js</Typography>
                    <Typography variant="body2">• MongoDB</Typography>
                    <Typography variant="body2">• JWT Authentication</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">• React</Typography>
                    <Typography variant="body2">• Material UI</Typography>
                    <Typography variant="body2">• RESTful API</Typography>
                    <Typography variant="body2">• Role-based Access Control</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Paper
          sx={{
            p: 4,
            bgcolor: '#0d47a1',
            color: 'white',
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
            Join thousands of users who trust our system for their user management needs.
            Sign up today to experience the full power of our platform.
          </Typography>
          
          {isAuthenticated() ? (
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              size="large"
              sx={{ 
                bgcolor: 'white', 
                color: '#0d47a1',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              Go to Dashboard
            </Button>
          ) : (
            <Box>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{ 
                  bgcolor: 'white', 
                  color: '#0d47a1',
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                Register Now
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;