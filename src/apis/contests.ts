import apiClient from './apiClient';
import { mockContestsResponse } from 'mocks/data/contests';

export const getAllContests = async () => {
  const res = await apiClient.get('/contests');
  return res.data;
};

export const postAllContests = async (contestName: string) => {
  const res = await apiClient.post('/contests', { contestName });
  return res.data;
};

export const deleteContest = async (contestId: number) => {
  const res = await apiClient.delete(`/contests/${contestId}`);
  console.log(res);
  return res.data;
};

export const patchContest = async (contestId: number, contestName: string) => {
  const res = await apiClient.patch(`/contests/${contestId}`, { contestName });
  return res.data;
};
