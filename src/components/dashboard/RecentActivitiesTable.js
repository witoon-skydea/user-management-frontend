import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Divider, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Box,
  Skeleton,
  Button
} from '@mui/material';
import { 
  MoreHoriz as MoreHorizIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

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

// Status chip helper component
const StatusChip = ({ status }) => {
  const statusConfig = {
    success: { color: 'success', icon: <CheckIcon fontSize="small" />, label: 'Success' },
    failed: { color: 'error', icon: <CloseIcon fontSize="small" />, label: 'Failed' },
    warning: { color: 'warning', icon: <WarningIcon fontSize="small" />, label: 'Warning' },
    pending: { color: 'default', icon: null, label: 'Pending' },
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig.pending;
  
  return (
    <Chip 
      icon={config.icon}
      label={config.label}
      size="small"
      color={config.color}
      variant="outlined"
    />
  );
};

const RecentActivitiesTable = ({ activities, loading }) => {
  // Default activities data if none is provided
  const defaultActivities = [
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

  // Use provided activities or default if none is provided
  const tableData = activities || defaultActivities;
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        title="Recent Activities" 
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <Button 
            component={Link} 
            to="/audit-logs" 
            color="primary"
            size="small"
            endIcon={<MoreHorizIcon />}
          >
            View All
          </Button>
        }
      />
      <Divider />
      <CardContent sx={{ p: 0 }}>
        {loading ? (
          <Box sx={{ p: 2 }}>
            {[...Array(5)].map((_, i) => (
              <Box key={i} sx={{ py: 1 }}>
                <Skeleton variant="text" width="100%" height={30} />
              </Box>
            ))}
          </Box>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="recent activities table">
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((activity) => (
                  <TableRow 
                    key={activity.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body2" fontWeight="medium">
                        {activity.user}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {activity.action}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          maxWidth: 250, 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap' 
                        }}
                      >
                        {activity.details}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(activity.timestamp)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusChip status={activity.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivitiesTable;