import { useState } from 'react';
import OngoingContestsPage from '@pages/admin/OngoingContestsPage';
import NoticeAdminPage from '@pages/admin/NoticeAdminPage';
import ContestAdminPage from '@pages/admin/ContestAdminPage';
import { PageType, PAGE_TYPE } from 'types/DTO';

const pageTabs: { label: string; value: PageType }[] = [
  { label: '진행 중 대회', value: PAGE_TYPE.진행중인대회 },
  { label: '공지사항 관리', value: PAGE_TYPE.공지사항관리 },
  { label: '대회 관리', value: PAGE_TYPE.대회관리 },
];

const pageComponentMap = {
  [PAGE_TYPE.진행중인대회]: <OngoingContestsPage />,
  [PAGE_TYPE.공지사항관리]: <NoticeAdminPage />,
  [PAGE_TYPE.대회관리]: <ContestAdminPage />,
};

const AdminPage = () => {
  const [page, setPage] = useState<PageType>(PAGE_TYPE.진행중인대회);

  return (
    <div>
      <div className="mb-8 flex gap-4">
        {pageTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setPage(tab.value)}
            className={`min-w-16 rounded-lg px-4 py-2 text-lg ${
              page === tab.value ? 'bg-subGreen text-black' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {pageComponentMap[page]}
    </div>
  );
};

export default AdminPage;
