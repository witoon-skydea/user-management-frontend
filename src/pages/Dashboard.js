import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Alert, CircularProgress } from '@mui/material';
import DashboardStats from '../components/dashboard/DashboardStats';
import ActivityChart from '../components/dashboard/ActivityChart';
import RecentActivitiesTable from '../components/dashboard/RecentActivitiesTable';
import { useAuth } from '../contexts/AuthContext';
import dashboardService from '../services/dashboardService';

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
        // Fetch actual data from API
        const [statsData, activityData, recentActivities] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getActivityData(),
          dashboardService.getRecentActivities(5)
        ]);
        
        setStats(statsData);
        setActivityData(activityData);
        setRecentActivities(recentActivities);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        
        // Set fallback data if API fails
        setStats({
          totalUsers: 0,
          activeServices: 0,
          totalRoles: 0,
          recentActivities: 0
        });
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