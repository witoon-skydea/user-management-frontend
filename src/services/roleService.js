import api from './api';

// Create a new role (admin only)
const createRole = async (roleData) => {
  const response = await api.post('/roles', roleData);
  return response.data;
};

// Get all roles (admin only)
const getAllRoles = async () => {
  const response = await api.get('/roles');
  return response.data;
};

// Get role by ID (admin only)
const getRoleById = async (roleId) => {
  const response = await api.get(`/roles/${roleId}`);
  return response.data;
};

// Update role (admin only)
const updateRole = async (roleId, roleData) => {
  const response = await api.put(`/roles/${roleId}`, roleData);
  return response.data;
};

// Delete role (admin only)
const deleteRole = async (roleId) => {
  const response = await api.delete(`/roles/${roleId}`);
  return response.data;
};

const roleService = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
};

export default roleService;