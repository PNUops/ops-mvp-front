import axios from 'axios';

const base = import.meta.env.VITE_API_BASE_URL ?? '';

const apiClient = axios.create({
  baseURL: `${base}/api`,
  timeout: 3000 * 10,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiClient;
