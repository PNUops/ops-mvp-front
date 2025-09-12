import apiClient from './apiClient';
import { TeamLikeResponseDto } from '../types/DTO';
import { TeamAwardData, TeamDisplayOrder } from '../types/DTO/teams/teamAwardDto';

export const getRanking = async (): Promise<TeamLikeResponseDto[]> => {
  const { data } = await apiClient.get<TeamLikeResponseDto[]>('/admin/ranking');
  return data;
};

export const updateTeamAward = async (teamId: number, data: TeamAwardData): Promise<void> => {
  await apiClient.put(`/admin/teams/${teamId}/award`, data);
};

export const updateDisplayOrders = async (orders: TeamDisplayOrder[]): Promise<void> => {
  await apiClient.put('/admin/teams/display-order', orders);
};
