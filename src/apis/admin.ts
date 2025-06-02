import axios from 'axios';
import { useTokenStore } from '../stores/useTokenStore';
import apiClient from './apiClient';

export const getDashboard = async () => {
  const token = useTokenStore.getState().token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await apiClient.get('/admin/dashboard', { headers });
  return res.data;
};

export const getRanking = async () => {
  const token = useTokenStore.getState().token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await apiClient.get('/admin/ranking', { headers });
  return res.data;
};

export const getRate = async () => {
  const token = useTokenStore.getState().token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await apiClient.get('/admin/participation-rate', { headers });
  return res.data;
};
