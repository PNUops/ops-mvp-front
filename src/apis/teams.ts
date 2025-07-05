import { TeamListItemResponseDto } from '../types/DTO/teams/teamListDto';
import { SubmissionStatusResponseDto } from '../types/DTO/teams/submissionStatusDto';
import apiClient from './apiClient';
import { mockTeamsResponse } from 'mocks/data/teams';

export const getAllTeams = async (contestId: number): Promise<TeamListItemResponseDto[]> => {
  // const res = await apiClient.get(`/contests/${contestId}/teams`);
  // return res.data;
  if (contestId === 1) {
    return mockTeamsResponse;
  }
  if (contestId === 2) {
    return [
      {
        teamId: 3,
        teamName: 'team3',
        projectName: 'team3 Project',
        isLiked: false,
      },
    ];
  }
  return [];
};

export const getSubmissionStatus = async (): Promise<SubmissionStatusResponseDto> => {
  const res = await apiClient.get('/teams/submission-status');
  return res.data;
};
