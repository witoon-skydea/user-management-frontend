import api from './api';

/**
 * Get dashboard statistics
 * This will fetch stats like total users, services, roles, etc.
 */
const getStats = async () => {
  try {
    // Try to get stats from API if available
    // If API doesn't have this endpoint, use calculated stats from other endpoints
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.log('Dashboard stats endpoint not available, using composite data');
      
      // If the dashboard endpoint is not available, collect data from other endpoints
      const [usersResponse, servicesResponse, rolesResponse, auditLogsResponse] = await Promise.all([
        api.get('/users'),
        api.get('/services'),
        api.get('/roles'),
        api.get('/audit-logs?limit=50')
      ]);
      
      return {
        totalUsers: usersResponse.data.length || usersResponse.data.count || 0,
        activeServices: servicesResponse.data.filter(s => s.active).length || 0,
        totalRoles: rolesResponse.data.length || 0,
        recentActivities: auditLogsResponse.data.length || 0
      };
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

/**
 * Get user activity data for charts
 */
const getActivityData = async () => {
  try {
    // Try to get activity data from API if available
    try {
      const response = await api.get('/dashboard/activity-data');
      return response.data;
    } catch (error) {
      console.log('Activity data endpoint not available, using audit logs');
      
      // If activity data endpoint is not available, use audit logs
      const auditLogsResponse = await api.get('/audit-logs?limit=100');
      const logs = auditLogsResponse.data;
      
      // Process audit logs to get activity data
      // This is a basic implementation - you'd want more sophisticated processing in production
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
      const currentMonth = new Date().getMonth();
      const labels = [];
      
      // Get labels for the last 7 months
      for (let i = 6; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12; // Handle wraparound for previous year
        labels.push(months[monthIndex]);
      }
      
      // Initialize data arrays
      const loginData = new Array(7).fill(0);
      const registrationData = new Array(7).fill(0);
      const serviceData = new Array(7).fill(0);
      
      // Sort logs into categories
      logs.forEach(log => {
        const logDate = new Date(log.timestamp);
        const logMonth = logDate.getMonth();
        const monthIndex = labels.indexOf(months[logMonth]);
        
        if (monthIndex !== -1) {
          if (log.action === 'user.login') {
            loginData[monthIndex]++;
          } else if (log.action === 'user.register') {
            registrationData[monthIndex]++;
          } else if (log.action.includes('service')) {
            serviceData[monthIndex]++;
          }
        }
      });
      
      return {
        labels,
        datasets: [
          {
            label: 'User Logins',
            data: loginData,
            fill: false,
            borderColor: 'rgb(13, 71, 161)',
            backgroundColor: 'rgba(13, 71, 161, 0.5)',
          },
          {
            label: 'New Registrations',
            data: registrationData,
            fill: false,
            borderColor: 'rgb(46, 125, 50)',
            backgroundColor: 'rgba(46, 125, 50, 0.5)',
          },
          {
            label: 'Service Access',
            data: serviceData,
            fill: false,
            borderColor: 'rgb(198, 40, 40)',
            backgroundColor: 'rgba(198, 40, 40, 0.5)',
          },
        ],
      };
    }
  } catch (error) {
    console.error('Error fetching activity data:', error);
    throw error;
  }
};

/**
 * Get recent activities
 */
const getRecentActivities = async (limit = 5) => {
  try {
    const response = await api.get(`/audit-logs?limit=${limit}`);
    
    // Process audit logs to match the format expected by the UI
    return response.data.map(log => ({
      id: log._id,
      user: log.userId ? log.userId.username || log.userId : 'System',
      action: log.action,
      details: log.details,
      timestamp: log.timestamp,
      status: determineStatus(log.action, log.details)
    }));
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    throw error;
  }
};

// Helper function to determine status based on action and details
const determineStatus = (action, details) => {
  if (details && (details.includes('fail') || details.includes('error') || details.includes('invalid'))) {
    return 'failed';
  }
  
  if (details && details.includes('warning')) {
    return 'warning';
  }
  
  return 'success';
};

const dashboardService = {
  getStats,
  getActivityData,
  getRecentActivities
};

export default dashboardService;