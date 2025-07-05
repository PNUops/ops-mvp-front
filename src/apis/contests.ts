import { ContestResponseDto } from 'types/DTO';
import apiClient from './apiClient';
import { TeamListItemResponseDto } from 'types/DTO/teams/teamListDto';

export const getAllContests = async (): Promise<ContestResponseDto[]> => {
  const res = await apiClient.get('/contests');
  return res.data;
};

export const getCurrentContestTeams = async (): Promise<TeamListItemResponseDto[]> => {
  const res = await apiClient.get('/contests/current/teams');
  return res.data;
};

export const getContestTeams = async (contestId: number): Promise<TeamListItemResponseDto[]> => {
  const res = await apiClient.get(`/contests/${contestId}/teams`);
  return res.data;
};
