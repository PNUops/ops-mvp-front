
import apiClient from './apiClient';
import { NoticeDetailDto } from '../types/DTO/notices/NoticeDetailDto';

export const getNotices = async () => {
  const { data } = await apiClient.get('/notices');
  return data;
};


export const getNoticeDetail = async (noticeId: number): Promise<NoticeDetailDto> => {
  const { data } = await apiClient.get(`/notices/${noticeId}`);
  return data;
};