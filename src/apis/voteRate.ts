import apiClient from './apiClient';
import { VoteRate } from '../types/DTO';

export const getVoteRate = async (): Promise<VoteRate> => {
  const { data } = await apiClient.get<VoteRate>('/admin/participation-rate');
  return data;
};
