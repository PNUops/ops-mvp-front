import { TeamListItemResponseDto } from '../types/DTO/teams/teamListDto';
import { SubmissionStatusResponseDto } from '../types/DTO/teams/submissionStatusDto';
import apiClient from './apiClient';
import { mockTeamsResponse } from 'mocks/data/teams';
import { SortOption } from '@pages/admin/TeamSortToggle';

export const getAllTeams = async (contestId: number): Promise<TeamListItemResponseDto[]> => {
  const res = await apiClient.get(`/contests/${contestId}/teams`);
  return res.data;
};

export const getSubmissionStatus = async (): Promise<SubmissionStatusResponseDto> => {
  const res = await apiClient.get('/teams/submission-status');
  return res.data;
};

export const deleteTeams = async (teamId_: number) => {
  const res = await apiClient.delete(`/teams/${teamId_}`);
  return res.data;
};

export const patchSortTeam = async (mode: string) => {
  const res = await apiClient.patch('/teams/sort', { mode: mode });
  return res.data;
};

export const getSortTeam = async (): Promise<SortOption> => {
  const res = await apiClient.get('/teams/sort');
  return res.data.currentMode as SortOption;
};
