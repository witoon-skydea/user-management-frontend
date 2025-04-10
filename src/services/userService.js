import api from './api';

// Get all users (admin only)
const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Get user by ID (admin only)
const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Update user status (admin only)
const updateUserStatus = async (userId, status) => {
  const response = await api.put(`/users/${userId}/status`, { status });
  return response.data;
};

// Delete user (admin only)
const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

const userService = {
  getAllUsers,
  getUserById,
  updateUserStatus,
  deleteUser
};

export default userService;