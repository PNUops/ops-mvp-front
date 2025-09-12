import ProjectSubmissionTable from '@pages/admin/ProjectSubmissionTable';
import ProjectSortToggle from './ProjectSortToggle';
import VoteTermSelector from './VoteTermSelector';
import AwardManagement from './AwardManagement';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboard } from 'apis/dashboard';
import { updateTeamAward, updateDisplayOrders } from 'apis/ranking';
import { DashboardTeamResponseDto } from 'types/DTO';
import { TeamAwardData } from 'types/DTO/teams/teamAwardDto';
import { useState, useEffect, useRef } from 'react';
import { useToast } from 'hooks/useToast';

const OngoingContestsTab = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [displayOrders, setDisplayOrders] = useState<{[key: number]: number}>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardTeamResponseDto[]>({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
    staleTime: 0,
    refetchOnMount: true,
  });

  const updateDisplayOrdersMutation = useMutation({
    mutationFn: (orders: { teamId: number; displayOrder: number }[]) => updateDisplayOrders(orders),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['ranking'] });
      toast('표시 순서가 업데이트되었습니다.', 'success');
    },
    onError: () => {
      toast('표시 순서 업데이트에 실패했습니다.', 'error');
    },
  });

  const updateAwardMutation = useMutation({
    mutationFn: ({ teamId, awardData }: { teamId: number; awardData: TeamAwardData }) => 
      updateTeamAward(teamId, awardData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['ranking'] });
      toast('수상 정보가 업데이트되었습니다.', 'success');
    },
    onError: () => {
      toast('수상 정보 업데이트에 실패했습니다.', 'error');
    },
  });

  useEffect(() => {
    if (dashboardData) {
      const orders: {[key: number]: number} = {};
      dashboardData.forEach((team, index) => {
        if (team.teamId) {
          orders[team.teamId] = team.displayOrder || index + 1;
        }
      });
      setDisplayOrders(orders);
    }
  }, [dashboardData]);

  const handleDisplayOrderChange = (teamId: number, order: number) => {
    setDisplayOrders(prev => ({ ...prev, [teamId]: order }));
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      const ordersArray = Object.entries(displayOrders).map(([id, order]) => ({
        teamId: Number(id),
        displayOrder: order
      }));
      ordersArray.push({ teamId, displayOrder: order });
      updateDisplayOrdersMutation.mutate(ordersArray);
    }, 1000);
  };

  const handleUpdateAward = (teamId: number, awardData: TeamAwardData) => {
    updateAwardMutation.mutate({ teamId, awardData });
  };

  if (isDashboardLoading) {
    return <p className="text-center text-gray-400">로딩 중...</p>;
  }

  if (!dashboardData) {
    return (
      <div className="mx-auto w-full rounded bg-white p-6 text-center shadow-md">
        <p className="text-red-500">데이터를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }
  const dashboardWithOrders = dashboardData?.map(team => ({
    ...team,
    displayOrder: displayOrders[team.teamId!] || team.displayOrder
  })) || [];

  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="border-lightGray rounded-xl border p-8">
          <VoteTermSelector />
          <div className="my-6 border-t border-gray-200"></div>
          <ProjectSortToggle />
        </div>
        
        {/* 수상 설정 섹션 - 프로젝트 등록현황 위로 이동 */}
        <div className="border-lightGray rounded-xl border p-8">
          <h2 className="mb-6 text-2xl font-bold">수상 설정</h2>
          <AwardManagement
            teams={dashboardWithOrders}
            onUpdateAward={handleUpdateAward}
            onUpdateDisplayOrders={() => {}}
          />
        </div>
        
        <ProjectSubmissionTable 
          submissions={dashboardWithOrders} 
          type="project" 
          onDisplayOrderChange={handleDisplayOrderChange}
          isEditMode={true}
        />
      </div>
    </>
  );
};

export default OngoingContestsTab;
