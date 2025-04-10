import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Button, 
  Avatar, 
  Divider,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Person as PersonIcon, 
  Dashboard as DashboardIcon,
  PeopleAlt as PeopleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  BusinessCenter as BusinessCenterIcon,
  Badge as BadgeIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // States for menus
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle profile menu open
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  // Handle profile menu close
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Handle logout
  const handleLogout = async () => {
    handleProfileMenuClose();
    await logout();
    navigate('/login');
  };
  
  // Navigation items
  const navigationItems = [
    { name: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', showWhen: 'admin' },
    { name: 'Users', icon: <PeopleIcon />, path: '/users', showWhen: 'admin' },
    { name: 'Services', icon: <BusinessCenterIcon />, path: '/services', showWhen: 'admin' },
    { name: 'Roles', icon: <BadgeIcon />, path: '/roles', showWhen: 'admin' },
    { name: 'Audit Logs', icon: <HistoryIcon />, path: '/audit-logs', showWhen: 'admin' },
  ];
  
  // Filtered navigation items based on user role
  const filteredNavItems = navigationItems.filter(item => {
    if (item.showWhen === 'authenticated' && user) return true;
    if (item.showWhen === 'admin' && user?.roles?.includes('admin')) return true;
    return false;
  });
  
  // Mobile menu drawer content
  const mobileMenuContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleMobileMenu}
    >
      <List>
        {user ? (
          <ListItem sx={{ py: 2, px: 3 }}>
            <Avatar 
              sx={{ 
                bgcolor: theme.palette.primary.main, 
                width: 40, 
                height: 40 
              }}
            >
              {user?.displayName?.charAt(0) || <PersonIcon />}
            </Avatar>
            <ListItemText 
              primary={user.displayName || 'User'} 
              secondary={user.email}
              sx={{ ml: 2 }}
            />
          </ListItem>
        ) : (
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText primary="Guest" />
          </ListItem>
        )}
        
        <Divider />
        
        {filteredNavItems.map((item) => (
          <ListItem 
            button 
            component={Link} 
            to={item.path} 
            key={item.name}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        
        <Divider />
        
        {user ? (
          <>
            <ListItem button component={Link} to="/profile">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
  
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleMobileMenu}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              color: 'white', 
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
            User Management
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {filteredNavItems.map((item) => (
                <Button 
                  color="inherit" 
                  component={Link} 
                  to={item.path} 
                  key={item.name}
                  sx={{ mx: 1 }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}
          
          {user ? (
            <Box>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar 
                  sx={{ 
                    bgcolor: '#ffffff', 
                    color: theme.palette.primary.main,
                    width: 32, 
                    height: 32 
                  }}
                >
                  {user?.displayName?.charAt(0) || <PersonIcon />}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem 
                  onClick={() => {
                    handleProfileMenuClose();
                    navigate('/profile');
                  }}
                >
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  My Profile
                </MenuItem>
                <MenuItem 
                  onClick={() => {
                    handleProfileMenuClose();
                    navigate('/settings');
                  }}
                >
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
      >
        {mobileMenuContent}
      </Drawer>
    </>
  );
};

export default Header;