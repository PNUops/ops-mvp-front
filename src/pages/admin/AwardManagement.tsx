import { useState, useEffect } from 'react';
import AwardBadge from '../../components/AwardBadge';
import { TeamAwardData, TeamDisplayOrder } from '../../types/DTO/teams/teamAwardDto';

interface Team {
  teamId: number;
  teamName: string;
  projectName: string;
  displayOrder?: number;
  awardTitle?: string;
  awardBadgeColor?: string;
  awardBadgeSize?: string;
}

interface AwardManagementProps {
  teams: Team[];
  onUpdateAward: (teamId: number, awardData: TeamAwardData) => void;
  onUpdateDisplayOrders: (orders: TeamDisplayOrder[]) => void;
}

const AwardManagement = ({ teams, onUpdateAward, onUpdateDisplayOrders }: AwardManagementProps) => {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [awardTitle, setAwardTitle] = useState('');
  const [awardColor, setAwardColor] = useState('#FFD700');
  const [awardSize, setAwardSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [displayOrders, setDisplayOrders] = useState<Map<number, number>>(new Map());
  const [isEditingOrder, setIsEditingOrder] = useState(false);

  useEffect(() => {
    const ordersMap = new Map();
    teams.forEach((team, idx) => {
      ordersMap.set(team.teamId, team.displayOrder || idx + 1);
    });
    setDisplayOrders(ordersMap);
  }, [teams]);

  const handleTeamSelect = (teamId: number) => {
    setSelectedTeam(teamId);
    const team = teams.find(t => t.teamId === teamId);
    if (team) {
      setAwardTitle(team.awardTitle || '');
      setAwardColor(team.awardBadgeColor || '#FFD700');
      setAwardSize((team.awardBadgeSize as 'small' | 'medium' | 'large') || 'medium');
    }
  };

  const handleSaveAward = () => {
    if (selectedTeam) {
      onUpdateAward(selectedTeam, {
        awardTitle: awardTitle || undefined,
        awardBadgeColor: awardColor,
        awardBadgeSize: awardSize,
      });
      setSelectedTeam(null);
      setAwardTitle('');
    }
  };

  const handleOrderChange = (teamId: number, newOrder: number) => {
    const updatedOrders = new Map(displayOrders);
    updatedOrders.set(teamId, newOrder);
    setDisplayOrders(updatedOrders);
  };

  const handleSaveOrders = () => {
    const orders = Array.from(displayOrders.entries()).map(([teamId, displayOrder]) => ({
      teamId,
      displayOrder,
    }));
    onUpdateDisplayOrders(orders);
    setIsEditingOrder(false);
  };

  const predefinedColors = [
    { label: '1 (금색)', value: '#FFD700' },
    { label: '2 (은색)', value: '#C0C0C0' },
    { label: '3 (동색)', value: '#CD7F32' },
    { label: '4 (연갈색)', value: '#D2691E' },
    { label: '5 (회색)', value: '#808080' },
    { label: '인기 (파란색)', value: '#4169E1' },
    { label: '특별 (빨간색)', value: '#DC143C' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block mb-2 font-medium">팀 선택</label>
        <select
          value={selectedTeam || ''}
          onChange={(e) => handleTeamSelect(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">팀을 선택하세요</option>
          {teams.map((team) => (
            <option key={team.teamId} value={team.teamId}>
              {team.teamName} - {team.projectName}
            </option>
          ))}
        </select>
      </div>

      {selectedTeam && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">상훈명</label>
            <input
              type="text"
              value={awardTitle}
              onChange={(e) => setAwardTitle(e.target.value)}
              placeholder="예: 대상, 최우수상, 우수상"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">뱃지 색상</label>
            <div className="flex gap-2">
              <select
                value={awardColor}
                onChange={(e) => setAwardColor(e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
              >
                {predefinedColors.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </select>
              <input
                type="color"
                value={awardColor}
                onChange={(e) => setAwardColor(e.target.value)}
                className="w-20 h-10 border rounded cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">뱃지 크기</label>
            <select
              value={awardSize}
              onChange={(e) => setAwardSize(e.target.value as 'small' | 'medium' | 'large')}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="small">작게</option>
              <option value="medium">보통</option>
              <option value="large">크게</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">미리보기</label>
            <div className="p-4 bg-gray-50 rounded flex items-center">
              {awardTitle ? (
                <AwardBadge
                  title={awardTitle}
                  color={awardColor}
                  size={awardSize}
                />
              ) : (
                <span className="text-gray-400">상훈명을 입력하세요</span>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={handleSaveAward}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
            >
              수상 정보 저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AwardManagement;