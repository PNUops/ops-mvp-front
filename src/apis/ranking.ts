import apiClient from './apiClient';
import { TeamLike } from '../types/DTO';

export const getRanking = async (): Promise<TeamLike[]> => {
  const { data } = await apiClient.get<TeamLike[]>('/admin/ranking');
  return data;
};
