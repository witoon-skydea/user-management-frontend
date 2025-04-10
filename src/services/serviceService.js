import api from './api';

// Create a new service (admin only)
const createService = async (serviceData) => {
  const response = await api.post('/services', serviceData);
  return response.data;
};

// Get all services (admin only)
const getAllServices = async () => {
  const response = await api.get('/services');
  return response.data;
};

// Get service by ID (admin only)
const getServiceById = async (serviceId) => {
  const response = await api.get(`/services/${serviceId}`);
  return response.data;
};

// Update service (admin only)
const updateService = async (serviceId, serviceData) => {
  const response = await api.put(`/services/${serviceId}`, serviceData);
  return response.data;
};

// Regenerate service credentials (admin only)
const regenerateCredentials = async (serviceId) => {
  const response = await api.post(`/services/${serviceId}/regenerate-credentials`);
  return response.data;
};

// Delete service (admin only)
const deleteService = async (serviceId) => {
  const response = await api.delete(`/services/${serviceId}`);
  return response.data;
};

const serviceService = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  regenerateCredentials,
  deleteService
};

export default serviceService;