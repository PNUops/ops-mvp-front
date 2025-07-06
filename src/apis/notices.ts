import apiClient from './apiClient';
import { NoticeResponseDto } from 'types/DTO/notices/NoticeResponseDto';
import { NoticeDetailDto } from '../types/DTO/notices/NoticeDetailDto';
import { NoticeRequestDto } from 'types/DTO/notices/NoticeRequestDto';

export const getNotices = async (): Promise<NoticeResponseDto[]> => {
  const { data } = await apiClient.get('/notices');
  return data;
};

export const getNoticeDetail = async (noticeId: number): Promise<NoticeDetailDto> => {
  const { data } = await apiClient.get(`/notices/${noticeId}`);
  return data;
};

export const postCreateNotice = async (request: NoticeRequestDto) => {
  const { data } = await apiClient.post('/notices', request);
  return data;
};

export const patchNotice = async (noticeId: number, request: NoticeRequestDto) => {
  const { data } = await apiClient.patch(`/notices/${noticeId}`, request);
  return data;
};
