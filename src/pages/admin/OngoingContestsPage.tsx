import ProjectSubmissionTable from '@pages/admin/ProjectSubmissionTable';
import VoteRate from '@pages/admin/VoteRate';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getDashboard } from 'apis/dashboard';
import { getRanking } from 'apis/ranking';
import { DashboardTeamResponseDto, TeamLikeResponseDto } from 'types/DTO';
import useAuth from 'hooks/useAuth';

const OngoingContestsPage = () => {
  const { isAdmin } = useAuth();
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardTeamResponseDto[]>({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
    enabled: isAdmin,
    staleTime: 0,
    refetchOnMount: true,
  });
  const { data: rankingData, isLoading: isRankingLoading } = useQuery<TeamLikeResponseDto[]>({
    queryKey: ['ranking'],
    queryFn: getRanking,
    enabled: isAdmin,
    staleTime: 0,
    refetchOnMount: true,
  });

  if (!isAdmin) {
    return (
      <div className="mx-auto w-full rounded bg-white p-6 text-center shadow-md">
        <p className="text-red-500">관리자 권한이 없습니다.</p>
      </div>
    );
  }

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
    <div className="max-w-container flex flex-col gap-12 px-4 py-8">
      <ProjectSubmissionTable submissions={dashboardData} type="project" />
      <ProjectSubmissionTable submissions={rankingData} type="vote" />
      <VoteRate />
    </div>
  );
};

export default OngoingContestsPage;
