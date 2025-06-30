import { ContestResponseDto } from 'types/DTO';
import apiClient from './apiClient';

export const getAllContests = async (): Promise<ContestResponseDto[]> => {
  const res = await apiClient.get('/contests');
  return res.data;
};
