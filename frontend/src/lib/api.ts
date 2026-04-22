import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: { username: string; email: string; password: string; fullName: string; role?: string }) =>
    apiClient.post('/auth/register', data),
  login: (data: { username: string; password: string }) => apiClient.post('/auth/login', data),
  getMe: () => apiClient.get('/auth/me'),
};

export const plansAPI = {
  getAll: () => apiClient.get('/plans'),
  getById: (id: string) => apiClient.get(`/plans/${id}`),
  create: (data: any) => apiClient.post('/plans', data),
  update: (id: string, data: any) => apiClient.put(`/plans/${id}`, data),
  delete: (id: string) => apiClient.delete(`/plans/${id}`),
};

export const stationsAPI = {
  getAll: () => apiClient.get('/stations'),
  getById: (id: string) => apiClient.get(`/stations/${id}`),
  create: (data: any) => apiClient.post('/stations', data),
  update: (id: string, data: any) => apiClient.put(`/stations/${id}`, data),
  updateStatus: (id: string, status: string) => apiClient.patch(`/stations/${id}/status`, { status }),
  delete: (id: string) => apiClient.delete(`/stations/${id}`),
};

export const sessionsAPI = {
  getAll: () => apiClient.get('/sessions'),
  getActive: () => apiClient.get('/sessions/active'),
  getById: (id: string) => apiClient.get(`/sessions/${id}`),
  create: (data: any) => apiClient.post('/sessions', data),
  end: (id: string) => apiClient.post(`/sessions/${id}/end`),
  pause: (id: string) => apiClient.post(`/sessions/${id}/pause`),
  resume: (id: string) => apiClient.post(`/sessions/${id}/resume`),
  generateBill: (id: string, data: any) => apiClient.post(`/sessions/${id}/generate-bill`, data),
};

export const inventoryAPI = {
  getAll: () => apiClient.get('/inventory'),
  getByCategory: (category: string) => apiClient.get(`/inventory/category/${category}`),
  getLowStock: () => apiClient.get('/inventory/low-stock'),
  getById: (id: string) => apiClient.get(`/inventory/${id}`),
  create: (data: any) => apiClient.post('/inventory', data),
  update: (id: string, data: any) => apiClient.put(`/inventory/${id}`, data),
  restock: (id: string, quantity: number) => apiClient.post(`/inventory/${id}/restock`, { quantity }),
  deduct: (id: string, quantity: number) => apiClient.post(`/inventory/${id}/deduct`, { quantity }),
  delete: (id: string) => apiClient.delete(`/inventory/${id}`),
};

export const billsAPI = {
  getAll: () => apiClient.get('/bills'),
  getByStatus: (status: string) => apiClient.get(`/bills/status/${status}`),
  getById: (id: string) => apiClient.get(`/bills/${id}`),
  create: (data: any) => apiClient.post('/bills', data),
  update: (id: string, data: any) => apiClient.put(`/bills/${id}`, data),
  pay: (id: string, paymentMethod?: string) => apiClient.post(`/bills/${id}/pay`, { paymentMethod }),
  cancel: (id: string) => apiClient.post(`/bills/${id}/cancel`),
  delete: (id: string) => apiClient.delete(`/bills/${id}`),
  getStats: () => apiClient.get('/bills/stats/daily'),
};

export default apiClient;
