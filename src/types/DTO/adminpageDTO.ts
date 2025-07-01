export type PageType = '진행중인 대회' | '공지사항 관리' | '대회관리';

export const PAGE_TYPE = {
  진행중인대회: '진행중인 대회',
  공지사항관리: '공지사항 관리',
  대회관리: '대회관리',
} as const;
