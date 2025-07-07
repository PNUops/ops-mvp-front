import { Outlet, Link, useParams, useResolvedPath, useLocation } from 'react-router-dom';
import AdminTabs from '@route/AdminTabs';
import useAuth from 'hooks/useAuth';

const AdminPage = () => {
  const { isAdmin } = useAuth();
  const adminTabs = AdminTabs;
  const { pathname } = useLocation();

  if (!isAdmin) {
    return (
      <div className="w-full rounded bg-white p-6 text-center shadow-md">
        <p className="text-mainRed text-xl">관리자 권한이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex gap-4">
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={`/admin/${tab.path}`}
            className={`min-w-16 rounded-lg px-4 py-2 text-lg ${
              pathname.includes(tab.path ?? '') ? 'bg-subGreen text-black' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {tab.handle.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-12 px-4 py-8">
        <Outlet />
      </div>
    </>
  );
};

export default AdminPage;
