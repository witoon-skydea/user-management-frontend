import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Alert, CircularProgress } from '@mui/material';
import DashboardStats from '../components/dashboard/DashboardStats';
import ActivityChart from '../components/dashboard/ActivityChart';
import RecentActivitiesTable from '../components/dashboard/RecentActivitiesTable';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [recentActivities, setRecentActivities] = useState(null);

  useEffect(() => {
    // Function to fetch dashboard data
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // In a real application, you would fetch this data from your API
        // For now, we'll simulate an API call with a timeout
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for demonstration
        const mockStats = {
          totalUsers: 256,
          activeServices: 18,
          totalRoles: 24,
          recentActivities: 143
        };
        
        const mockActivityData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'User Logins',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(13, 71, 161)',
              backgroundColor: 'rgba(13, 71, 161, 0.5)',
            },
            {
              label: 'New Registrations',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: 'rgb(46, 125, 50)',
              backgroundColor: 'rgba(46, 125, 50, 0.5)',
            },
            {
              label: 'Service Access',
              data: [33, 25, 35, 51, 54, 76, 80],
              fill: false,
              borderColor: 'rgb(198, 40, 40)',
              backgroundColor: 'rgba(198, 40, 40, 0.5)',
            },
          ],
        };
        
        const mockRecentActivities = [
          {
            id: '1',
            user: 'John Doe',
            action: 'User Login',
            details: 'Successful login from IP 192.168.1.1',
            timestamp: new Date().toISOString(),
            status: 'success'
          },
          {
            id: '2',
            user: 'Jane Smith',
            action: 'Password Change',
            details: 'Password changed successfully',
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            status: 'success'
          },
          {
            id: '3',
            user: 'Alice Johnson',
            action: 'Access Service',
            details: 'Failed to access TOC_workshop service',
            timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
            status: 'failed'
          },
          {
            id: '4',
            user: 'Bob Brown',
            action: 'User Registration',
            details: 'New user registration',
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            status: 'success'
          },
          {
            id: '5',
            user: 'Charlie Davis',
            action: 'Role Assignment',
            details: 'Assigned role: workshop_manager',
            timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            status: 'warning'
          },
        ];
        
        setStats(mockStats);
        setActivityData(mockActivityData);
        setRecentActivities(mockRecentActivities);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Welcome back, {user?.displayName || 'User'}!
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {loading && !stats ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Statistics Cards */}
          <Grid item xs={12}>
            <DashboardStats stats={stats} loading={loading} />
          </Grid>
          
          {/* Activity Chart */}
          <Grid item xs={12} md={8}>
            <ActivityChart data={activityData} loading={loading} />
          </Grid>
          
          {/* User Overview Card */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                height: '100%',
                bgcolor: '#f3f6f9',
                borderRadius: 2,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                System Overview
              </Typography>
              
              <Box sx={{ my: 2 }}>
                <Typography variant="body1" gutterBottom>
                  🔹 Active user management system
                </Typography>
                <Typography variant="body1" gutterBottom>
                  🔹 Role-based access control
                </Typography>
                <Typography variant="body1" gutterBottom>
                  🔹 Service integration management
                </Typography>
                <Typography variant="body1" gutterBottom>
                  🔹 Comprehensive audit logging
                </Typography>
                <Typography variant="body1" gutterBottom>
                  🔹 Secure authentication with JWT
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                The system is currently operating normally with no reported issues.
              </Typography>
            </Box>
          </Grid>
          
          {/* Recent Activities Table */}
          <Grid item xs={12}>
            <RecentActivitiesTable activities={recentActivities} loading={loading} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;