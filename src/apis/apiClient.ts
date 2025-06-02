import axios from 'axios';
import { useTokenStore } from 'stores/useTokenStore';
import Cookies from 'js-cookie';

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
    // 토큰 쿠키에서 직접 가져옴
    // const token = useTokenStore.getState().token;
    const token = Cookies.get('access_token');
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
