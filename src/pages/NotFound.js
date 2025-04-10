import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';

const NotFound = () => {
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
        <ErrorOutlineIcon color="primary" sx={{ fontSize: 100, mb: 2 }} />
        
        <Typography variant="h2" color="primary" gutterBottom>
          404
        </Typography>
        
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Typography>
        
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          color="primary" 
          size="large"
        >
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;