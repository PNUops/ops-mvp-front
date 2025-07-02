
import apiClient from './apiClient';
import { mockNoticesResponse } from '@mocks/data/notices';
import { NoticeDetailDto } from '../types/DTO/notices/NoticeDetailDto';

export const getNotices = async () => {
  // const { data } = await apiClient.get('/notices');
  // return data;
  return await mockNoticesResponse();
};


export const getNoticeDetail = async (noticeId: number): Promise<NoticeDetailDto> => {
  const { data } = await apiClient.get(`/notices/${noticeId}`);
  return data;
};