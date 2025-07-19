import apiClient from './apiClient';
import { NoticeResponseDto } from 'types/DTO/notices/NoticeResponseDto';
import { NoticeDetailDto } from '../types/DTO/notices/NoticeDetailDto';
import { NoticeRequestDto } from 'types/DTO/notices/NoticeRequestDto';

export const getNotices = async (): Promise<NoticeResponseDto[]> => {
  const { data } = await apiClient.get('/notices');
  return data.map((notice: NoticeResponseDto) => ({
    ...notice,
    updatedAt: new Date(notice.updatedAt),
  }));
};

export const getNoticeDetail = async (noticeId: number): Promise<NoticeDetailDto> => {
  const { data } = await apiClient.get(`/notices/${noticeId}`);
  return { ...data, updatedAt: new Date(data.updatedAt) };
};

export const postCreateNotice = async (request: NoticeRequestDto) => {
  const { data } = await apiClient.post('/notices', request);
  return data;
};

export const patchNotice = async (noticeId: number, request: NoticeRequestDto) => {
  const { data } = await apiClient.patch(`/notices/${noticeId}`, request);
  return data;
};

export const deleteNotice = async (noticeId: number) => {
  const { data } = await apiClient.delete(`/notices/${noticeId}`);
  return data;
};
