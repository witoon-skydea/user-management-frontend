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
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  Person as PersonIcon,
  VpnKey as VpnKeyIcon,
  Notifications as NotificationsIcon,
  History as HistoryIcon,
  ArrowForward as ArrowForwardIcon,
  Shield as ShieldIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserHome = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // User actions
  const userActions = [
    {
      title: 'My Profile',
      description: 'View and update your profile information',
      icon: <PersonIcon sx={{ fontSize: 60, color: '#0d47a1' }} />,
      linkTo: '/profile',
      linkText: 'View Profile'
    },
    {
      title: 'Security Settings',
      description: 'Change password and manage security options',
      icon: <SecurityIcon sx={{ fontSize: 60, color: '#0d47a1' }} />,
      linkTo: '/profile',
      linkText: 'Security Settings'
    },
    {
      title: 'Notification Preferences',
      description: 'Configure your notification settings',
      icon: <NotificationsIcon sx={{ fontSize: 60, color: '#0d47a1' }} />,
      linkTo: '/profile',
      linkText: 'Notification Settings'
    },
    {
      title: 'Activity History',
      description: 'View your recent account activities',
      icon: <HistoryIcon sx={{ fontSize: 60, color: '#0d47a1' }} />,
      linkTo: '/profile',
      linkText: 'View Activity'
    }
  ];

  return (
    <Box>
      {/* User welcome section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: '#0d47a1',
          color: '#fff',
          mb: 4,
          borderRadius: 2,
          overflow: 'hidden',
          py: { xs: 4, md: 5 },
          px: { xs: 3, md: 4 },
        }}
        elevation={3}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Welcome, {user?.displayName || 'User'}!
              </Typography>
              <Typography
                variant="h6"
                color="inherit"
                paragraph
                sx={{ opacity: 0.9 }}
              >
                Manage your profile and account settings from this user dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                sx={{
                  width: { xs: 100, md: 150 },
                  height: { xs: 100, md: 150 },
                  bgcolor: '#fff',
                  color: '#0d47a1',
                  fontSize: { xs: 40, md: 60 },
                  fontWeight: 600,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                }}
              >
                {user?.displayName?.charAt(0).toUpperCase() || <PersonIcon fontSize="inherit" />}
              </Avatar>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* User actions grid */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ fontWeight: 600, mb: 3 }}
        >
          My Account
        </Typography>
        
        <Grid container spacing={3}>
          {userActions.map((action, index) => (
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
                elevation={2}
              >
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    {action.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ textAlign: 'center' }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    component={Link} 
                    to={action.linkTo} 
                    size="small" 
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ ml: 'auto', mr: 'auto' }}
                  >
                    {action.linkText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Account information section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }} elevation={2}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
            Account Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Username" 
                    secondary={user?.username || 'Not set'} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VpnKeyIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email" 
                    secondary={user?.email || 'Not set'} 
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ShieldIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Account Type" 
                    secondary={user?.roles?.includes('admin') ? 'Administrator' : 'Standard User'} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <HistoryIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Last Login" 
                    secondary="Recent Activity" 
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Quick actions footer */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Paper
          sx={{
            p: 3,
            bgcolor: '#f3f6f9',
            borderRadius: 2,
            textAlign: 'center'
          }}
          elevation={1}
        >
          <Typography variant="h6" gutterBottom>
            Need to make changes to your account?
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/profile"
              variant="contained"
              color="primary"
            >
              Edit Profile
            </Button>
            <Button
              component={Link}
              to="/profile"
              variant="outlined"
              color="primary"
            >
              Change Password
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserHome;