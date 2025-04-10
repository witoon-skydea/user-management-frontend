import api from './api';

// Assign user to service (admin only)
const assignUserToService = async (assignData) => {
  const response = await api.post('/user-services', assignData);
  return response.data;
};

// Update user-service relationship (admin only)
const updateUserServiceRel = async (userId, serviceId, updateData) => {
  const response = await api.put(`/user-services/${userId}/${serviceId}`, updateData);
  return response.data;
};

// Delete user-service relationship (admin only)
const deleteUserServiceRel = async (userId, serviceId) => {
  const response = await api.delete(`/user-services/${userId}/${serviceId}`);
  return response.data;
};

// Get all users for a service (admin only)
const getUsersByService = async (serviceId) => {
  const response = await api.get(`/user-services/users/${serviceId}`);
  return response.data;
};

// Get all services for a user (admin only)
const getServicesByUser = async (userId) => {
  const response = await api.get(`/user-services/services/${userId}`);
  return response.data;
};

// Get details of user-service relationship (admin only)
const getUserServiceDetails = async (userId, serviceId) => {
  const response = await api.get(`/user-services/${userId}/${serviceId}`);
  return response.data;
};

const userServiceRelService = {
  assignUserToService,
  updateUserServiceRel,
  deleteUserServiceRel,
  getUsersByService,
  getServicesByUser,
  getUserServiceDetails
};

export default userServiceRelService;