import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Chip
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  VpnKey as VpnKeyIcon,
  History as HistoryIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Security as SecurityIcon,
  LockReset as LockResetIcon,
  VerifiedUser as VerifiedUserIcon,
  TimerOutlined as TimerOutlinedIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';
import auditLogService from '../services/auditLogService';
import userServiceRelService from '../services/userServiceRelService';

// TabPanel component for tab content
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const UserProfile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [value, setValue] = useState(0); // Tab state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [recentActivities, setRecentActivities] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);

  // Profile form validation schema
  const profileValidationSchema = Yup.object({
    displayName: Yup.string()
      .min(2, 'Display Name must be at least 2 characters')
      .max(50, 'Display Name must be at most 50 characters')
      .required('Display Name is required'),
    profileImage: Yup.string()
      .url('Must be a valid URL'),
    bio: Yup.string()
      .max(300, 'Bio must be at most 300 characters'),
    location: Yup.string()
      .max(100, 'Location must be at most 100 characters'),
  });

  // Password change validation schema
  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string()
      .required('Current Password is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .required('New Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Profile form
  const profileFormik = useFormik({
    initialValues: {
      displayName: user?.displayName || '',
      profileImage: user?.profileImage || '',
      bio: user?.metadata?.bio || '',
      location: user?.metadata?.location || '',
    },
    validationSchema: profileValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        // Create the updated profile object
        const updatedProfile = {
          displayName: values.displayName,
          profileImage: values.profileImage,
          metadata: {
            ...user.metadata,
            bio: values.bio,
            location: values.location
          }
        };

        // Call the update profile function
        await updateProfile(updatedProfile);
        
        setSuccess('Profile updated successfully');
        setEditMode(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  // Password change form
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        // Call the change password function
        await changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword
        });
        
        setSuccess('Password changed successfully');
        
        // Reset form
        passwordFormik.resetForm();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to change password. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  // Fetch user's recent activities
  useEffect(() => {
    const fetchRecentActivities = async () => {
      if (!user) return;
      
      setActivitiesLoading(true);
      try {
        // In a real application, you would fetch this from the API
        // For now, we'll use mock data
        // const response = await auditLogService.getAuditLogsByUser(user.id);
        // setRecentActivities(response.data);
        
        // Mock data
        const mockActivities = [
          {
            id: '1',
            action: 'Login',
            details: 'Successful login from IP 192.168.1.1',
            timestamp: new Date().toISOString(),
            ipAddress: '192.168.1.1',
            userAgent: 'Chrome on Windows'
          },
          {
            id: '2',
            action: 'Profile Update',
            details: 'Updated profile information',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            ipAddress: '192.168.1.1',
            userAgent: 'Chrome on Windows'
          },
          {
            id: '3',
            action: 'Service Access',
            details: 'Accessed TOC_workshop service',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            ipAddress: '192.168.1.1',
            userAgent: 'Chrome on Windows'
          }
        ];
        
        setRecentActivities(mockActivities);
      } catch (err) {
        console.error('Error fetching recent activities:', err);
      } finally {
        setActivitiesLoading(false);
      }
    };
    
    fetchRecentActivities();
  }, [user]);

  // Fetch user's services
  useEffect(() => {
    const fetchUserServices = async () => {
      if (!user) return;
      
      setServicesLoading(true);
      try {
        // In a real application, you would fetch this from the API
        // For now, we'll use mock data
        // const response = await userServiceRelService.getServicesByUser(user.id);
        // setUserServices(response.data);
        
        // Mock data
        const mockServices = [
          {
            id: '1',
            name: 'TOC_workshop',
            description: 'Workshop collaboration platform',
            roles: ['workshop_manager'],
            customData: {
              workshopsJoined: 5,
              lastActiveAt: new Date(Date.now() - 86400000).toISOString()
            }
          },
          {
            id: '2',
            name: 'MixTrip',
            description: 'Travel planning and sharing',
            roles: ['standard_user'],
            customData: {
              tripCount: 3,
              followersCount: 12
            }
          }
        ];
        
        setUserServices(mockServices);
      } catch (err) {
        console.error('Error fetching user services:', err);
      } finally {
        setServicesLoading(false);
      }
    };
    
    fetchUserServices();
  }, [user]);

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (editMode) {
      // Reset form when canceling edit
      profileFormik.resetForm({
        values: {
          displayName: user?.displayName || '',
          profileImage: user?.profileImage || '',
          bio: user?.metadata?.bio || '',
          location: user?.metadata?.location || '',
        }
      });
    }
    setEditMode(!editMode);
    setError(null);
    setSuccess(null);
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Summary Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Avatar
                src={user.profileImage}
                alt={user.displayName}
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem'
                }}
              >
                {!user.profileImage && (user.displayName?.charAt(0) || <PersonIcon fontSize="large" />)}
              </Avatar>

              <Typography variant="h5" gutterBottom>
                {user.displayName}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>

              <Box sx={{ mt: 2, mb: 3 }}>
                <Chip
                  icon={<VerifiedUserIcon />}
                  label={user.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
                  color={user.isEmailVerified ? 'success' : 'warning'}
                  variant="outlined"
                  sx={{ m: 0.5 }}
                />
                <Chip
                  icon={<SecurityIcon />}
                  label={`Status: ${user.status}`}
                  color={user.status === 'active' ? 'success' : 'default'}
                  variant="outlined"
                  sx={{ m: 0.5 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <TimerOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Member Since"
                    secondary={formatDate(user.createdAt)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Last Login"
                    secondary={formatDate(user.lastLoginAt)}
                  />
                </ListItem>
                {user.metadata?.location && (
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location"
                      secondary={user.metadata.location}
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Tabs Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="profile tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  label="Profile Details"
                  id="profile-tab-0"
                  aria-controls="profile-tabpanel-0"
                  icon={<PersonIcon />}
                  iconPosition="start"
                />
                <Tab
                  label="Change Password"
                  id="profile-tab-1"
                  aria-controls="profile-tabpanel-1"
                  icon={<VpnKeyIcon />}
                  iconPosition="start"
                />
                <Tab
                  label="Services"
                  id="profile-tab-2"
                  aria-controls="profile-tabpanel-2"
                  icon={<SecurityIcon />}
                  iconPosition="start"
                />
                <Tab
                  label="Activity History"
                  id="profile-tab-3"
                  aria-controls="profile-tabpanel-3"
                  icon={<HistoryIcon />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            <CardContent>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}

              {/* Profile Details Tab */}
              <TabPanel value={value} index={0}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Button
                    variant={editMode ? 'outlined' : 'contained'}
                    color={editMode ? 'secondary' : 'primary'}
                    startIcon={editMode ? null : <EditIcon />}
                    onClick={toggleEditMode}
                    disabled={loading}
                  >
                    {editMode ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </Box>

                <form onSubmit={profileFormik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="displayName"
                        name="displayName"
                        label="Display Name"
                        variant="outlined"
                        value={profileFormik.values.displayName}
                        onChange={profileFormik.handleChange}
                        onBlur={profileFormik.handleBlur}
                        error={profileFormik.touched.displayName && Boolean(profileFormik.errors.displayName)}
                        helperText={profileFormik.touched.displayName && profileFormik.errors.displayName}
                        disabled={!editMode || loading}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="profileImage"
                        name="profileImage"
                        label="Profile Image URL"
                        variant="outlined"
                        value={profileFormik.values.profileImage}
                        onChange={profileFormik.handleChange}
                        onBlur={profileFormik.handleBlur}
                        error={profileFormik.touched.profileImage && Boolean(profileFormik.errors.profileImage)}
                        helperText={profileFormik.touched.profileImage && profileFormik.errors.profileImage}
                        disabled={!editMode || loading}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="bio"
                        name="bio"
                        label="Bio"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={profileFormik.values.bio}
                        onChange={profileFormik.handleChange}
                        onBlur={profileFormik.handleBlur}
                        error={profileFormik.touched.bio && Boolean(profileFormik.errors.bio)}
                        helperText={profileFormik.touched.bio && profileFormik.errors.bio}
                        disabled={!editMode || loading}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="location"
                        name="location"
                        label="Location"
                        variant="outlined"
                        value={profileFormik.values.location}
                        onChange={profileFormik.handleChange}
                        onBlur={profileFormik.handleBlur}
                        error={profileFormik.touched.location && Boolean(profileFormik.errors.location)}
                        helperText={profileFormik.touched.location && profileFormik.errors.location}
                        disabled={!editMode || loading}
                      />
                    </Grid>

                    {editMode && (
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          startIcon={<SaveIcon />}
                          disabled={loading}
                          sx={{ mt: 1 }}
                        >
                          {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </form>
              </TabPanel>

              {/* Change Password Tab */}
              <TabPanel value={value} index={1}>
                <form onSubmit={passwordFormik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="currentPassword"
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        variant="outlined"
                        value={passwordFormik.values.currentPassword}
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        error={passwordFormik.touched.currentPassword && Boolean(passwordFormik.errors.currentPassword)}
                        helperText={passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword}
                        disabled={loading}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        type="password"
                        variant="outlined"
                        value={passwordFormik.values.newPassword}
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        error={passwordFormik.touched.newPassword && Boolean(passwordFormik.errors.newPassword)}
                        helperText={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword}
                        disabled={loading}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm New Password"
                        type="password"
                        variant="outlined"
                        value={passwordFormik.values.confirmPassword}
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        error={passwordFormik.touched.confirmPassword && Boolean(passwordFormik.errors.confirmPassword)}
                        helperText={passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword}
                        disabled={loading}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<LockResetIcon />}
                        disabled={loading}
                        sx={{ mt: 1 }}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Change Password'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </TabPanel>

              {/* Services Tab */}
              <TabPanel value={value} index={2}>
                {servicesLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : userServices.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      You have not been assigned to any services yet.
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {userServices.map((service) => (
                      <Grid item xs={12} key={service.id}>
                        <Paper sx={{ p: 2, borderRadius: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            {service.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {service.description}
                          </Typography>
                          
                          <Box sx={{ mb: 2 }}>
                            {service.roles.map((role, index) => (
                              <Chip
                                key={index}
                                label={role}
                                color="primary"
                                size="small"
                                sx={{ mr: 1, mb: 1 }}
                              />
                            ))}
                          </Box>
                          
                          <Divider sx={{ my: 1 }} />
                          
                          <Typography variant="subtitle2" gutterBottom>
                            Custom Data:
                          </Typography>
                          <List dense>
                            {Object.entries(service.customData).map(([key, value], index) => (
                              <ListItem key={index}>
                                <ListItemText
                                  primary={`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}
                                  secondary={key.includes('At') ? formatDate(value) : value}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </TabPanel>

              {/* Activity History Tab */}
              <TabPanel value={value} index={3}>
                {activitiesLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : recentActivities.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No activity history found.
                    </Typography>
                  </Box>
                ) : (
                  <List>
                    {recentActivities.map((activity) => (
                      <Paper 
                        key={activity.id}
                        sx={{ 
                          mb: 2, 
                          borderRadius: 2,
                          overflow: 'hidden'
                        }}
                      >
                        <ListItem
                          sx={{
                            borderLeft: '4px solid',
                            borderColor: 'primary.main',
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1">
                                {activity.action}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography variant="body2" component="span">
                                  {activity.details}
                                </Typography>
                                <br />
                                <Typography variant="caption" color="text.secondary">
                                  {formatDate(activity.timestamp)}
                                </Typography>
                                <br />
                                <Typography variant="caption" color="text.secondary">
                                  IP: {activity.ipAddress} • {activity.userAgent}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      </Paper>
                    ))}
                  </List>
                )}
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;