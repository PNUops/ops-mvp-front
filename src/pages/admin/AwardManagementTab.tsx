import { useEffect, useState } from 'react';
import AwardManagement from './AwardManagement';
import { getRanking, updateTeamAward, updateDisplayOrders } from '../../apis/ranking';
import { getDashboard } from '../../apis/dashboard';

interface Team {
  teamId: number;
  teamName: string;
  projectName: string;
  displayOrder?: number;
  awardTitle?: string;
  awardBadgeColor?: string;
  awardBadgeSize?: string;
}

const AwardManagementTab = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const dashboardData = await getDashboard();
      const rankingData = await getRanking();
      
      const mergedTeams = dashboardData.map(team => {
        const rankingInfo = rankingData.find(r => r.teamName === team.teamName);
        return {
          teamId: team.teamId,
          teamName: team.teamName,
          projectName: team.projectName,
          displayOrder: rankingInfo?.displayOrder || team.displayOrder,
          awardTitle: rankingInfo?.awardTitle || team.awardTitle,
          awardBadgeColor: rankingInfo?.awardBadgeColor || team.awardBadgeColor,
          awardBadgeSize: rankingInfo?.awardBadgeSize || team.awardBadgeSize,
        };
      });
      
      setTeams(mergedTeams);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleUpdateAward = async (teamId: number, awardData: {
    awardTitle?: string;
    awardBadgeColor?: string;
    awardBadgeSize?: string;
    displayOrder?: number;
  }) => {
    try {
      await updateTeamAward(teamId, awardData);
      await fetchTeams(); // Refresh data
      alert('수상 정보가 업데이트되었습니다.');
    } catch (error) {
      console.error('Failed to update award:', error);
      alert('수상 정보 업데이트에 실패했습니다.');
    }
  };

  const handleUpdateDisplayOrders = async (orders: { teamId: number; displayOrder: number }[]) => {
    try {
      await updateDisplayOrders(orders);
      await fetchTeams(); // Refresh data
      alert('표시 순서가 업데이트되었습니다.');
    } catch (error) {
      console.error('Failed to update display orders:', error);
      alert('표시 순서 업데이트에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  return (
    <AwardManagement
      teams={teams}
      onUpdateAward={handleUpdateAward}
      onUpdateDisplayOrders={handleUpdateDisplayOrders}
    />
  );
};

export default AwardManagementTab;