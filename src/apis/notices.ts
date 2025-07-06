
import apiClient from './apiClient';
import { mockNoticesResponse } from '@mocks/data/notices';
import { NoticeDetailDto } from '../types/DTO/notices/NoticeDetailDto';
import { mockNoticeDetail } from '@mocks/data/noticeDetail';

export const getNotices = async () => {
  // const { data } = await apiClient.get('/notices');
  // return data;
  return await mockNoticesResponse();
};


export const getNoticeDetail = async (noticeId: number): Promise<NoticeDetailDto> => {
  // const { data } = await apiClient.get(`/notices/${noticeId}`);
  // return data;
  const notice = mockNoticeDetail[noticeId as keyof typeof mockNoticeDetail];

  if (!notice) {
    throw new Error ('404: 공지를 찾을 수 없습니다');
  }
  return notice;
};