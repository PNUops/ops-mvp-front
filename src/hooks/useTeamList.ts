import { useQuery } from '@tanstack/react-query';
import { getContestTeams, getCurrentContestTeams } from '../apis/contests';
import { TeamListItemResponseDto } from '../types/DTO/teams/teamListDto';
import useAuth from './useAuth';

const useTeamList = (contestId: number | 'current') => {
  const { user } = useAuth();
  return useQuery<TeamListItemResponseDto[]>({
    queryKey: ['teams', contestId, user?.id ?? 'guest'],
    queryFn: () => (contestId === 'current' ? getCurrentContestTeams() : getContestTeams(contestId)),
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 15,
  });
};

export default useTeamList;
