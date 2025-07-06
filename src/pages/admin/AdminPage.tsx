import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import OngoingContestsTab from '@pages/admin/OngoingContestsTab';
import NoticeAdminPage from '@pages/admin/NoticeAdminTab';
import ContestAdminPage from '@pages/admin/ContestAdminTab';
import { AdminTabType } from 'types/DTO';

const adminTabs = [
  {
    label: '진행 중 대회',
    value: AdminTabType.ONGOING,
    path: 'ongoing',
    component: <OngoingContestsTab />,
  },
  {
    label: '공지사항 관리',
    value: AdminTabType.NOTICE,
    path: 'notice',
    component: <NoticeAdminPage />,
  },
  {
    label: '대회 관리',
    value: AdminTabType.CONTEST,
    path: 'contest',
    component: <ContestAdminPage />,
  },
];

function TabFromPath(path: string | undefined): AdminTabType {
  if (!path) return AdminTabType.ONGOING;

  const tab = adminTabs.find((tab) => tab.path === path);
  return tab ? tab.value : AdminTabType.ONGOING;
}

const AdminPage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState<AdminTabType>(TabFromPath(tab));

  useEffect(() => {
    if (location.pathname === '/admin') {
      navigate('/admin/ongoing');
      return;
    }

    const tabFromPath = TabFromPath(tab);
    setCurrentTab(tabFromPath);
  }, [tab, location.pathname, navigate]);

  function handleTabClick(tabValue: AdminTabType) {
    const tabItem = adminTabs.find((tab) => tab.value === tabValue);
    if (tabItem) {
      navigate(`/admin/${tabItem.path}`);
    }
  }

  return (
    <div>
      <div className="mb-8 flex gap-4">
        {adminTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={`min-w-16 rounded-lg px-4 py-2 text-lg ${
              currentTab === tab.value ? 'bg-subGreen text-black' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {adminTabs.find((tab) => tab.value === currentTab)?.component}
    </div>
  );
};

export default AdminPage;
