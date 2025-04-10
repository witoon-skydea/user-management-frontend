import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#f5f5f5', 
        py: 3, 
        mt: 'auto' 
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              User Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comprehensive solution for user, role, and service management
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Links
            </Typography>
            <Link href="/" color="inherit" underline="hover" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/about" color="inherit" underline="hover" sx={{ mb: 1 }}>
              About
            </Link>
            <Link href="/contact" color="inherit" underline="hover" sx={{ mb: 1 }}>
              Contact
            </Link>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Resources
            </Typography>
            <Link href="/docs" color="inherit" underline="hover" sx={{ mb: 1 }}>
              Documentation
            </Link>
            <Link href="/api" color="inherit" underline="hover" sx={{ mb: 1 }}>
              API Reference
            </Link>
            <Link href="/support" color="inherit" underline="hover" sx={{ mb: 1 }}>
              Support
            </Link>
          </Box>
        </Box>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {currentYear} User Management. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <Link href="/privacy" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            |
            <Link href="/terms" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;