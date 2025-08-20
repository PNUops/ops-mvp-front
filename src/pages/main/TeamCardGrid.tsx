import TeamCard from '@pages/main/TeamCard';
import TeamCardSkeleton from '@pages/main/TeamCardSkeleton';
import { TeamListItemResponseDto } from 'types/DTO/teams/teamListDto';

interface Props {
  teams?: TeamListItemResponseDto[];
  isLoading: boolean;
  isError: boolean;
}

const TeamCardGrid = ({ teams, isLoading, isError }: Props) => {
  const IS_VOTE_TERM = false; // 투표 기간 여부
  console.log('이거 상수 세팅해둠 나중에 바꾸기! IS_VOTE_TERM:', IS_VOTE_TERM);

  return (
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
          IS_VOTE_TERM={IS_VOTE_TERM}
        />
      ))}
    </section>
  );
};

export default TeamCardGrid;
