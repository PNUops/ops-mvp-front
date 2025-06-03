import axios from 'axios';
import { getAccessToken } from 'utils/token';
const base = import.meta.env.VITE_API_BASE_URL ?? '';

const apiClient = axios.create({
  baseURL: `${base}/api`,
  timeout: 3000 * 10,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
