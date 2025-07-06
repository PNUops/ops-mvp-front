import { TeamListItemResponseDto } from '../types/DTO/teams/teamListDto';
import { SubmissionStatusResponseDto } from '../types/DTO/teams/submissionStatusDto';
import apiClient from './apiClient';
import { mockTeamsResponse } from 'mocks/data/teams';

export const getAllTeams = async (contestId: number): Promise<TeamListItemResponseDto[]> => {
  // const res = await apiClient.get(`/contests/${contestId}/teams`);
  // return res.data;
  if (contestId === 1) {
    return [...mockTeamsResponse];
  }
  return [];
};

export const getSubmissionStatus = async (): Promise<SubmissionStatusResponseDto> => {
  const res = await apiClient.get('/teams/submission-status');
  return res.data;
};

export const deleteTeams = async (teamId_: number) => {
  // const res = await apiClient.delete(`teams/${teamId}`);
  // return res.data;
  const newList = mockTeamsResponse.filter((team) => team.teamId !== teamId_);
  mockTeamsResponse.length = 0;
  mockTeamsResponse.push(...newList);
  return newList;
};

