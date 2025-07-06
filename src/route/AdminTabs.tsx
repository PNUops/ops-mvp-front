import { RouteObject } from 'react-router-dom';
import ContestAdminTab from '@pages/admin/ContestAdminTab';
import NoticeAdminTab from '@pages/admin/NoticeAdminTab';
import OngoingContestsTab from '@pages/admin/OngoingContestsTab';

const AdminTabs: RouteObject[] = [
  { index: true, path: 'ongoing', element: <OngoingContestsTab />, handle: { label: '진행 중 대회' } },
  { path: 'notice', element: <NoticeAdminTab />, handle: { label: '공지사항 관리' } },
  { path: 'contest', element: <ContestAdminTab />, handle: { label: '대회 관리' } },
];

export default AdminTabs;
