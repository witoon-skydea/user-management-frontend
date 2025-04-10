import { createTheme } from '@mui/material/styles';

// Create a theme with the requested colors
const theme = createTheme({
  palette: {
    primary: {
      light: '#4f83cc',
      main: '#0d47a1', // Dark blue as requested
      dark: '#002171',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f5f5f5',
      main: '#eeeeee', // Light gray for secondary elements
      dark: '#9e9e9e',
      contrastText: '#000',
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#5f6368',
    },
    background: {
      default: '#ffffff', // White background
      paper: '#ffffff',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Don't uppercase button text
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          backgroundColor: '#0d47a1',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#002171',
          },
        },
        outlinedPrimary: {
          borderColor: '#0d47a1',
          color: '#0d47a1',
          '&:hover': {
            backgroundColor: 'rgba(13, 71, 161, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
          borderRadius: 12,
          overflow: 'hidden',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 16,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#0d47a1',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0d47a1',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});

export default theme;