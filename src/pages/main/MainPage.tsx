import Notice from '@pages/main/Notice';
import LeaderSection from '@pages/main/LeaderSection';
import TeamCardGrid from '@pages/main/TeamCardGrid';
import useTeamList from 'hooks/useTeamList';
import TeamCardSkeleton from '@pages/main/TeamCardSkeleton';

const MainPage = () => {
  const { data: teams, isLoading, isError } = useTeamList('current');
  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      <Notice />
      <LeaderSection />
      <div className="flex flex-col gap-8">
        <h3 className="lg:text-title text-2xl font-bold">현재 투표진행중인 작품</h3>
        <TeamCardGrid teams={teams} isLoading={isLoading} isError={isError} />
      </div>
    </div>
);
};

export default MainPage;
