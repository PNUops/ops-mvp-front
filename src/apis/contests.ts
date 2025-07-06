import { ContestResponseDto } from 'types/DTO';
import apiClient from './apiClient';
import { mockContestsResponse } from 'mocks/data/contests';
import { TeamListItemResponseDto } from 'types/DTO/teams/teamListDto';

export const getAllContests = async (): Promise<ContestResponseDto[]> => {
  const res = await apiClient.get('/contests');
  return res.data;
};

export const postAllContests = async (contestName: string) => {
  // const res = await apiClient.post('/contests', contestName);
  // return res.data;
  const maxId = mockContestsResponse.length > 0 ? Math.max(...mockContestsResponse.map((c) => c.contestId)) : 0;
  const newContest = {
    contestId: maxId + 1,
    contestName,
    updatedAt: new Date().toISOString(),
  };
  mockContestsResponse.push(newContest);
  return newContest;
};

export const deleteContest = async (contestId_: number) => {
  // const res = await apiClient.delete(`/contests/{contestId}`);
  // return res.data;
  const newList = mockContestsResponse.filter((contest) => contest.contestId !== contestId_);
  mockContestsResponse.length = 0;
  mockContestsResponse.push(...newList);
  return newList;
};

export const patchContest = async (contestId: number, contestName: string) => {
  // const res = await apiClient.patch(`/contests/${contestId}`, contestName);
  // return res.data;
  const contest = mockContestsResponse.find((c) => c.contestId === contestId);
  if (contest) {
    contest.contestName = contestName;
    contest.updatedAt = new Date().toISOString();
  }
  return contest;
};

export const getCurrentContestTeams = async (): Promise<TeamListItemResponseDto[]> => {
  const res = await apiClient.get('/contests/current/teams');
  return res.data;
};

export const getContestTeams = async (contestId: number): Promise<TeamListItemResponseDto[]> => {
  const res = await apiClient.get(`/contests/${contestId}/teams`);
  return res.data;
};
