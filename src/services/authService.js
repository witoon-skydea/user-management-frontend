import api from './api';

const register = async (userData) => {
  try {
    console.log('Attempting to register user with data:', userData);
    
    // For testing only - simulate successful registration
    // Replace this with actual API call when backend is ready
    // Uncomment below when API is working
    // const response = await api.post('/users/register', userData);
    
    // Mock successful response for testing
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Registration successful (mock)');
    
    const mockResponse = {
      success: true,
      message: 'User registered successfully',
      user: {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        displayName: userData.displayName,
        isEmailVerified: false,
        status: 'pending'
      }
    };
    
    return mockResponse;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error);
    throw error;
  }
};

const login = async (credentials) => {
  try {
    console.log('Attempting to login with credentials:', credentials);
    
    // For testing only - simulate successful login
    // Replace this with actual API call when backend is ready
    // Uncomment below when API is working
    // const response = await api.post('/users/login', credentials);
    
    // Mock successful response for testing
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Login successful (mock)');
    
    // Check if credentials match test user
    if (credentials.username === 'mm11' && credentials.password === 'mm11mm11') {
      const mockResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        user: {
          id: Date.now().toString(),
          username: credentials.username,
          email: 'mm11@example.com',
          displayName: 'MM User',
          isEmailVerified: true,
          status: 'active',
          roles: ['admin']
        }
      };
      
      // Save auth data to local storage
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('refreshToken', mockResponse.refreshToken);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    } else {
      throw new Error('Invalid credentials');
    }
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
  changePassword,
  updateProfile,
  getProfile
};

export default authService;