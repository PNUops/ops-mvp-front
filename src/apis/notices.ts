
import apiClient from './apiClient';
import { mockNoticesResponse } from '@mocks/data/notices';

export const getNotices = async () => {
  // const { data } = await apiClient.get('/notices');
  // return data;
  return await mockNoticesResponse();
};