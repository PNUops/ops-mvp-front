import { useState } from 'react';
import OngoingContestsTab from '@pages/admin/OngoingContestsTab';
import NoticeAdminPage from '@pages/admin/NoticeAdminTab';
import ContestAdminPage from '@pages/admin/ContestAdminTab';
import { AdminTabType } from 'types/DTO';

const adminTabs = [
  {
    label: '진행 중 대회',
    value: AdminTabType.ONGOING,
    component: <OngoingContestsTab />,
  },
  {
    label: '공지사항 관리',
    value: AdminTabType.NOTICE,
    component: <NoticeAdminPage />,
  },
  {
    label: '대회 관리',
    value: AdminTabType.CONTEST,
    component: <ContestAdminPage />,
  },
];

function getInitialTab(): AdminTabType {
  const currentTab = localStorage.getItem('adminTab');
  if (currentTab !== null && !isNaN(Number(currentTab)) && Object.values(AdminTabType).includes(Number(currentTab))) {
    return Number(currentTab) as AdminTabType;
  }
  return AdminTabType.ONGOING;
}

const AdminPage = () => {
  const [page, setPage] = useState<AdminTabType>(getInitialTab);
  const currentTab = adminTabs.find((tab) => tab.value === page);

  function handleTabClick(tabValue: AdminTabType) {
    setPage(tabValue);
    localStorage.setItem('adminTab', tabValue.toString());
  }

  return (
    <div>
      <div className="mb-8 flex gap-4">
        {adminTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={`min-w-16 rounded-lg px-4 py-2 text-lg ${
              page === tab.value ? 'bg-subGreen text-black' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {currentTab?.component}
    </div>
  );
};

export default AdminPage;
