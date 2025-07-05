import TeamCard from '@pages/main/TeamCard';
import TeamCardSkeleton from '@pages/main/TeamCardSkeleton';
import useTeamList from 'hooks/useTeamList';

const TotalCards = () => {
  const { data: teams, isLoading, isError } = useTeamList('current');

  return (
    <div id="projects" className="flex flex-col gap-4">
      <div className="my-4 flex items-center justify-between">
        <h3 id="projects" className="lg:text-title text-2xl font-bold">
          현재 투표진행중인 작품
        </h3>
      </div>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-7 xl:gap-8">
        {isLoading && Array.from({ length: 20 }).map((_, i) => <TeamCardSkeleton key={i} />)}
        {isError && <p>데이터를 불러오지 못했습니다.</p>}
        {teams?.map((team) => (
          <TeamCard
            key={team.teamId}
            teamId={team.teamId}
            teamName={team.teamName}
            projectName={team.projectName}
            isLiked={team.isLiked}
          />
        ))}
      </section>
    </div>
  );
};

export default TotalCards;
