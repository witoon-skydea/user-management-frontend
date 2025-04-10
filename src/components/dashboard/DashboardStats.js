import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Skeleton
} from '@mui/material';
import { 
  People as PeopleIcon,
  BusinessCenter as BusinessIcon,
  SecurityOutlined as SecurityIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';

// Dashboard statistics component
const DashboardStats = ({ stats, loading }) => {
  // Define the statistic cards with their properties
  const statCards = [
    { 
      title: 'Total Users', 
      value: stats?.totalUsers || 0,
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#0d47a1' }} />,
      color: '#e3f2fd',
      border: '#bbdefb'
    },
    { 
      title: 'Active Services', 
      value: stats?.activeServices || 0,
      icon: <BusinessIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
      color: '#e8f5e9',
      border: '#c8e6c9'
    },
    { 
      title: 'Roles Defined', 
      value: stats?.totalRoles || 0,
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#c62828' }} />,
      color: '#ffebee',
      border: '#ffcdd2'
    },
    { 
      title: 'Recent Activities', 
      value: stats?.recentActivities || 0,
      icon: <TimelineIcon sx={{ fontSize: 40, color: '#6a1b9a' }} />,
      color: '#f3e5f5',
      border: '#e1bee7'
    }
  ];

  return (
    <Grid container spacing={3}>
      {statCards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card 
            sx={{ 
              height: '100%',
              backgroundColor: card.color,
              borderLeft: `4px solid ${card.border}`,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="div" color="text.secondary">
                  {card.title}
                </Typography>
                {card.icon}
              </Box>
              
              {loading ? (
                <Skeleton variant="text" width="80%" height={60} />
              ) : (
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                  {card.value.toLocaleString()}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardStats;