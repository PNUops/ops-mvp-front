import Notice from '@pages/main/Notice';
import TotalCards from '@pages/main/TotalCards';
import LeaderSection from "@pages/main/LeaderSection";

const MainPage = () => {
  return (
      <div className="relative flex flex-col gap-6 sm:gap-10">
          <Notice/>
          <div className="flex justify-end">
              <LeaderSection/>
          </div>
          <TotalCards/>
      </div>
  );
};

export default MainPage;
