import apiClient from './apiClient';

export const getDashboard = async () => {
  const res = await apiClient.get('/admin/dashboard');
  return res.data;
};

export const getRanking = async () => {
  const res = await apiClient.get('/admin/ranking');
  return res.data;
};

export const getRate = async () => {
  const res = await apiClient.get('/admin/participation-rate');
  return res.data;
};
