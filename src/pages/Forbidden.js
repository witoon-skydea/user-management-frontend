import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { Block as BlockIcon } from '@mui/icons-material';

const Forbidden = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
        textAlign: 'center',
        p: 3
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 2,
          maxWidth: 500,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <BlockIcon color="error" sx={{ fontSize: 100, mb: 2 }} />
        
        <Typography variant="h2" color="error" gutterBottom>
          403
        </Typography>
        
        <Typography variant="h5" gutterBottom>
          Access Forbidden
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          You do not have permission to access this page. 
          Please contact your administrator if you believe this is an error.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            component={Link} 
            to="/profile" 
            variant="contained" 
            color="primary"
          >
            My Profile
          </Button>
          
          <Button 
            component={Link} 
            to="/" 
            variant="outlined" 
            color="primary"
          >
            Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Forbidden;