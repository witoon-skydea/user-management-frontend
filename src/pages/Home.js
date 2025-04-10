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
  Divider,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  SupervisedUserCircle as SupervisedUserCircleIcon,
  Security as SecurityIcon,
  BusinessCenter as BusinessCenterIcon,
  History as HistoryIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
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
        elevation={3}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                  lineHeight: 1.2,
                  letterSpacing: '-0.5px'
                }}
              >
                User Management System
              </Typography>
              <Typography
                variant="h5"
                color="inherit"
                paragraph
                sx={{ 
                  opacity: 0.9, 
                  mb: 4,
                  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                  lineHeight: 1.4
                }}
              >
                Comprehensive solution for user, role, and service management
                with secure authentication and detailed audit logging.
              </Typography>
              
              {isAuthenticated() ? (
                <Button
                  component={Link}
                  to={authService.hasRole('admin') ? '/dashboard' : '/user-home'}
                  variant="contained"
                  size="large"
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#0d47a1',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                >
                  {authService.hasRole('admin') ? 'Go to Dashboard' : 'My Account'}
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
                      mr: { xs: 1, sm: 2 },
                      px: { xs: 2, sm: 3 },
                      py: { xs: 1, sm: 1.5 },
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 600,
                      '&:hover': { 
                        bgcolor: '#f5f5f5',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
                      },
                      transition: 'all 0.2s ease-in-out'
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
                      px: { xs: 2, sm: 3 },
                      py: { xs: 1, sm: 1.5 },
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 600,
                      '&:hover': { 
                        bgcolor: 'rgba(255, 255, 255, 0.12)',
                        borderColor: 'white',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Box 
                component="img"
                src="/logo512.png"
                alt="User Management"
                sx={{ 
                  width: '100%',
                  maxWidth: { sm: 300, md: 350, lg: 400 },
                  display: 'block',
                  margin: '0 auto',
                  filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.2))',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.25rem', md: '3rem' },
              fontWeight: 600
            }}
          >
            Key Features
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              px: 2
            }}
          >
            Our user management system provides a complete solution for managing users, roles, and services
            with robust security features and detailed activity tracking.
          </Typography>
        </Box>
        
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
                  }
                }}
                elevation={2}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1 }}>
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
      <Container maxWidth="lg" sx={{ mb: 6, px: { xs: 2, sm: 3, md: 4 } }}>
        <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }} elevation={2}>
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                  fontWeight: 600
                }}
              >
                About This System
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                Our User Management API provides a robust solution for handling user authentication, 
                authorization, and service integration in your applications.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                Built with modern technologies like Node.js, Express, MongoDB, and JWT, 
                this system ensures secure and scalable user management for your enterprise needs.
              </Typography>
              <Typography variant="body1">
                Whether you need to manage a few dozen users or scale to thousands, 
                our system provides the flexibility and security features you need.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  p: { xs: 2, sm: 3 }, 
                  bgcolor: '#f5f5f5', 
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  height: '100%'
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  Technology Stack
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ py: 0.5 }}>• Node.js</Typography>
                    <Typography variant="body2" sx={{ py: 0.5 }}>• Express.js</Typography>
                    <Typography variant="body2" sx={{ py: 0.5 }}>• MongoDB</Typography>
                    <Typography variant="body2" sx={{ py: 0.5 }}>• JWT Authentication</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ py: 0.5 }}>• React</Typography>
                    <Typography variant="body2" sx={{ py: 0.5 }}>• Material UI</Typography>
                    <Typography variant="body2" sx={{ py: 0.5 }}>• RESTful API</Typography>
                    <Typography variant="body2" sx={{ py: 0.5 }}>• Role-based Access Control</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mb: 6, px: { xs: 2, sm: 3, md: 4 } }}>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            bgcolor: '#0d47a1',
            color: 'white',
            borderRadius: 2,
            textAlign: 'center'
          }}
          elevation={3}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
              fontWeight: 600
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography 
            variant="body1" 
            paragraph 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto', 
              mb: 4,
              px: { xs: 1, sm: 2 } 
            }}
          >
            Join thousands of users who trust our system for their user management needs.
            Sign up today to experience the full power of our platform.
          </Typography>
          
          {isAuthenticated() ? (
            <Button
              component={Link}
              to={authService.hasRole('admin') ? '/dashboard' : '/user-home'}
              variant="contained"
              size="large"
              sx={{ 
                bgcolor: 'white', 
                color: '#0d47a1',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              {authService.hasRole('admin') ? 'Go to Dashboard' : 'My Account'}
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
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1, sm: 1.5 },
                  fontSize: { xs: '0.875rem', sm: '1rem' },
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