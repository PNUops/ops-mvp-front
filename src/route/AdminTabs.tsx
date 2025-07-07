import { RouteObject } from 'react-router-dom';
import ContestAdminTab from '@pages/admin/ContestAdminTab';
import OngoingContestsTab from '@pages/admin/OngoingContestsTab';
import ManageNoticeListTab from '@pages/admin/NoticeManageTab/ManageNoticeListTab';
import NoticeCreateTab from '@pages/admin/NoticeManageTab/NoticeCreateTab';
import NoticeEditTab from '@pages/admin/NoticeManageTab/NoticeEditTab';

const AdminTabs: RouteObject[] = [
  { index: true, path: 'ongoing', element: <OngoingContestsTab />, handle: { label: '진행 중 대회' } },
  {
    path: 'notice',
    handle: { label: '공지사항 관리' },
    children: [
      { index: true, element: <ManageNoticeListTab /> },
      {
        path: 'edit/:noticeId',
        element: <NoticeEditTab />,
      },
      { path: 'create', element: <NoticeCreateTab /> },
    ],
  },
  { path: 'contest', element: <ContestAdminTab />, handle: { label: '대회 관리' } },
];

export default AdminTabs;
