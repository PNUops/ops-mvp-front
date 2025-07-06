import Notice from '@pages/main/Notice';
import TotalCards from '@pages/main/TotalCards';
import LeaderSection from '@pages/main/LeaderSection';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const MainPage = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);


  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      <Notice />
      <LeaderSection />
      <TotalCards />
    </div>
  );
};

export default MainPage;
