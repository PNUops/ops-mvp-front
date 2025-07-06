import apiClient from './apiClient';
import { NoticeResponseDto } from 'types/DTO/notices/NoticeResponseDto';
import { NoticeDetailDto } from '../types/DTO/notices/NoticeDetailDto';

export const getNotices = async (): Promise<NoticeResponseDto[]> => {
  const { data } = await apiClient.get('/notices');
  return data;
};

export const getNoticeDetail = async (noticeId: number): Promise<NoticeDetailDto> => {
  const { data } = await apiClient.get(`/notices/${noticeId}`);
  return data;
};
