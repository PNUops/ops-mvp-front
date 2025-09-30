import { useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import FullContainer from './FullContainer';
import { Toaster } from '@components/Toaster';
import useAuthInit from 'hooks/useAuthInit';
import useScrollToTop from 'hooks/useScrollToTop';

const MainLayout = () => {
  const { isAuthInit } = useAuthInit();
  useScrollToTop();
  const location = useLocation();
  const hideSidebar =
    location.pathname.startsWith('/signin') ||
    location.pathname.startsWith('/signup') ||
    location.pathname.startsWith('/oauth') ||
    location.pathname.startsWith('/find');

  if (!isAuthInit) return <></>;
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex">
          {!hideSidebar && (
            <div className="self-start">
              <Sidebar />
            </div>
          )}
          <div className="flex-1">
            <FullContainer />
          </div>
        </div>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export default MainLayout;
