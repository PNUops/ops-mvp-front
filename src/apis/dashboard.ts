import apiClient from './apiClient';
import { DashboardTeam } from '../types/DTO';

export const getDashboard = async (): Promise<DashboardTeam[]> => {
  const { data } = await apiClient.get<DashboardTeam[]>('/admin/dashboard');
  return data;
};
