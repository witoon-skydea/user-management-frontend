import api from './api';

const register = async (userData) => {
  try {
    console.log('Attempting to register user with data:', userData);
    
    // Use actual API
    const response = await api.post('/users/register', userData);
    console.log('Registration response:', response);
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error);
    throw error;
  }
};

const login = async (credentials) => {
  try {
    console.log('Attempting to login with credentials:', credentials);
    
    // Use actual API
    const response = await api.post('/users/login', credentials);
    console.log('Login response:', response);
    
    if (!response || !response.data || !response.data.data) {
      throw new Error('Invalid response format from server');
    }
    
    const { token, refreshToken, user } = response.data.data;
    
    if (!token || !refreshToken || !user) {
      throw new Error('Missing authentication data in response');
    }
    
    // Save auth data to local storage
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error);
    throw error;
  }
};

const logout = async () => {
  try {
    await api.post('/users/logout');
  } catch (error) {
    console.error('Logout failed', error);
  } finally {
    // Clean local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await api.post('/users/refresh-token', { refreshToken });
  
  const { token, refreshToken: newRefreshToken } = response.data;
  
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', newRefreshToken);
  
  return response.data;
};

const verifyEmail = async (token) => {
  const response = await api.get(`/users/verify-email/${token}`);
  return response.data;
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Failed to parse user from localStorage', error);
    return null;
  }
};

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const hasRole = (role) => {
  const user = getCurrentUser();
  if (!user || !user.roles) return false;
  
  return user.roles.includes(role);
};

const hasAnyRole = (requiredRoles = []) => {
  if (requiredRoles.length === 0) return true;
  
  const user = getCurrentUser();
  if (!user || !user.roles || !Array.isArray(user.roles)) return false;
  
  return requiredRoles.some(role => user.roles.includes(role));
};

const changePassword = async (passwordData) => {
  const response = await api.post('/users/change-password', passwordData);
  return response.data;
};

const updateProfile = async (profileData) => {
  const response = await api.put('/users/profile', profileData);
  
  // Update user in local storage
  const user = getCurrentUser();
  localStorage.setItem('user', JSON.stringify({ ...user, ...profileData }));
  
  return response.data;
};

const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  refreshToken,
  verifyEmail,
  getCurrentUser,
  isAuthenticated,
  hasRole,
  hasAnyRole,
  changePassword,
  updateProfile,
  getProfile
};

export default authService;