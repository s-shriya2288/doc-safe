import axios from 'axios';

// Auto-detect production backend, fallback to localhost for dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

// For Phase 1, we auto-login as admin to instantly obtain a JWT token
export const initMockAuth = async () => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email: 'admin@docsafe.app' });
    if (res.data?.access_token) {
      localStorage.setItem('docsafe_token', res.data.access_token);
    }
  } catch (err) {
    console.warn("Could not auto-login to backend. Ensure backend is running locally.", err);
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('docsafe_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
