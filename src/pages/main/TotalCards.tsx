import TeamCard from '@pages/main/TeamCard';
import { useQuery } from '@tanstack/react-query';
import { getAllTeams } from '../../apis/teams';
import { TeamListItemResponseDto } from '../../types/DTO/teams/teamListDto';
import useAuth from 'hooks/useAuth';
import TeamCardSkeleton from "@pages/main/TeamCardSkeleton";

const TotalCards = () => {
  const { user } = useAuth();
  const {
    data: teams,
    isLoading,
    isError,
  } = useQuery<TeamListItemResponseDto[]>({
    queryKey: ['teams', user?.id ?? 'guest'],
    queryFn: getAllTeams,
    staleTime: 1000 * 60 * 15, // stale 시간: 15분
    gcTime: 1000 * 60 * 15, // 캐시 삭제 기간 : 15분 간격
  });

  return (
    <div id="projects" className="flex flex-col gap-4">
      <div className="my-4 flex items-center justify-between">
        <h3 id="projects" className="lg:text-title text-2xl font-bold">
          현재 투표진행중인 작품
        </h3>
      </div>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-8">
        {isLoading &&
            Array.from({ length: 4 }).map((_, i) => <TeamCardSkeleton key={i} />)}

        {isError && <p>데이터를 불러오지 못했습니다.</p>}
        {teams?.map((team) => (
          <TeamCard
            key={team.teamId}
            teamId={team.teamId}
            teamName={team.teamName}
            projectName={team.projectName}
            isLiked={team.liked}
          />
        ))}
      </section>
    </div>
  );
};

export default TotalCards;
