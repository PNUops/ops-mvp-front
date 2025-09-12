import ProjectSubmissionTable from '@pages/admin/ProjectSubmissionTable';
import VoteRate from '@pages/admin/VoteRate';
import { useQuery } from '@tanstack/react-query';
import { getRanking } from 'apis/ranking';
import { TeamLikeResponseDto } from 'types/DTO';

const VoteStatisticsTab = () => {
  const { data: rankingData, isLoading: isRankingLoading } = useQuery<TeamLikeResponseDto[]>({
    queryKey: ['ranking'],
    queryFn: getRanking,
    staleTime: 0,
    refetchOnMount: true,
  });

  if (isRankingLoading) {
    return <p className="text-center text-gray-400">로딩 중...</p>;
  }

  if (!rankingData) {
    return (
      <div className="mx-auto w-full rounded bg-white p-6 text-center shadow-md">
        <p className="text-red-500">데이터를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <ProjectSubmissionTable 
        submissions={rankingData.map(item => ({
          ...item,
          awardTitle: undefined,
          awardBadgeColor: undefined,
          awardBadgeSize: undefined
        }))} 
        type="vote" 
      />
      <VoteRate />
    </div>
  );
};

export default VoteStatisticsTab;