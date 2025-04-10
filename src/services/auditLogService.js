import api from './api';

// Get all audit logs (admin only)
const getAllAuditLogs = async (params) => {
  const response = await api.get('/audit-logs', { params });
  return response.data;
};

// Get audit log by ID (admin only)
const getAuditLogById = async (logId) => {
  const response = await api.get(`/audit-logs/${logId}`);
  return response.data;
};

// Get audit logs by user (admin only)
const getAuditLogsByUser = async (userId, params) => {
  const response = await api.get(`/audit-logs/user/${userId}`, { params });
  return response.data;
};

// Get audit logs by service (admin only)
const getAuditLogsByService = async (serviceId, params) => {
  const response = await api.get(`/audit-logs/service/${serviceId}`, { params });
  return response.data;
};

const auditLogService = {
  getAllAuditLogs,
  getAuditLogById,
  getAuditLogsByUser,
  getAuditLogsByService
};

export default auditLogService;