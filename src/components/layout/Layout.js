import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import theme from '../../styles/theme';

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
          }}
        >
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;