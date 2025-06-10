import Notice from '@pages/main/Notice';
import TotalCards from '@pages/main/TotalCards';
import LeaderSection from '@pages/main/LeaderSection';

const MainPage = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      <Notice />
      <LeaderSection />
      <TotalCards />
    </div>
  );
};

export default MainPage;
