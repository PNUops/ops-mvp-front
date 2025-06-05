import ProjectSubmissionTable from '@pages/admin/ProjectSubmissionTable';
import VoteRate from '@pages/admin/VoteRate';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getDashboard } from 'apis/dashboard';
import { getRanking } from 'apis/ranking';
import { DashboardTeamResponseDto, TeamLikeResponseDto } from 'types/DTO';

const AdminPage = () => {
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardTeamResponseDto[]>({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  });
  const { data: rankingData, isLoading: isRankingLoading } = useQuery<TeamLikeResponseDto[]>({
    queryKey: ['ranking'],
    queryFn: getRanking,
  });

  const sortedRankingData = useMemo(
    () => [...(rankingData ?? [])].sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0)),
    [rankingData],
  );

  if (isDashboardLoading || isRankingLoading) {
    return <p className="text-center text-gray-400">로딩 중...</p>;
  }
  if (!dashboardData || !rankingData) {
    return (
      <div className="mx-auto w-full rounded bg-white p-6 text-center shadow-md">
        <p className="text-red-500">데이터를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }
  return (
    <div className="max-w-container flex flex-col gap-12 p-8">
      {/* 프로젝트 등록현황 */}
      <ProjectSubmissionTable submissions={mockSubmissions} type="project" />

      {/* 좋아요 랭킹 */}
      <ProjectSubmissionTable submissions={sortedByLikes} type="vote" />

      {/* 투표 참여율 */}
      <VoteRate
        pieData={pieData}
        pieColors={pieColors}
        totalVotes={1000} // 총 투표수
        participationRate={pieData[0].value} // 참여율
      />
    </div>
  );
};

export default AdminPage;
