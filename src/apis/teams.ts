import { TeamListItemResponseDto } from '../types/DTO/teams/teamListDto';
import { SubmissionStatusResponseDto } from '../types/DTO/teams/submissionStatusDto';
import apiClient from './apiClient';
import { mockTeamsResponse } from 'mocks/data/teams';


export const getCurrentContestTeams = async (): Promise<TeamListItemResponseDto[]> => {
    const { data } = await apiClient.get('/contests/current/teams');
    return data;
};

export const getTeamsByContestId = async (contestId: number): Promise<TeamListItemResponseDto[]> => {
    const { data } = await apiClient.get(`/contests/${contestId}/teams`);
    return data;
};

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

