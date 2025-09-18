import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSortStatus, patchTeamAward } from 'apis/teams';
import { PatchAwardRequestDto } from 'types/DTO';
import { SortOption } from '@pages/admin/ProjectSortToggle';

import { useToast } from 'hooks/useToast';
import useAuth from 'hooks/useAuth';
import useTeamList from 'hooks/useTeamList';

interface AwardPatchInfo extends PatchAwardRequestDto {
  teamId: number;
}

interface AwardState extends PatchAwardRequestDto {
  selectedTeamId?: number;
}

export const useAwardPatchAdmin = (contestId: number) => {
  const { user } = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: teamList } = useTeamList(contestId);
  const { data: sortStatus } = useQuery<SortOption>({
    queryKey: ['sortStatus'],
    queryFn: async () => {
      return await getSortStatus();
    },
  });

  const [awardState, setAwardState] = useState<AwardState>({
    selectedTeamId: undefined,
    awardName: '',
    awardColor: '',
  });

  const awardPatchSectionAvailable = sortStatus === 'CUSTOM';
  const awardPatchSubmitAvailable =
    (awardState.selectedTeamId && awardState.awardName && awardState.awardColor) ?? false;

  useEffect(() => {
    if (!teamList || awardState.selectedTeamId === undefined) return;
    const team = teamList.find((t) => t.teamId === awardState.selectedTeamId);
    if (team) {
      setAwardState((prev) => ({
        ...prev,
        awardName: team.awardName || '',
        awardColor: team.awardColor || '',
      }));
    }
  }, [awardState.selectedTeamId, teamList]);

  const awardPatchMutation = useMutation({
    mutationFn: ({ teamId, awardName, awardColor }: AwardPatchInfo) =>
      patchTeamAward(teamId, { awardName, awardColor }),
    onSuccess: () => {
      toast('수상 설정이 반영되었어요', 'success');
      queryClient.invalidateQueries({ queryKey: ['teams', contestId, user?.id ?? 'guest'] });
    },
    onError: () => {
      toast('수상 설정 저장에 실패했어요', 'error');
    },
  });

  const onSelectTeam = (teamId: number) => setAwardState((prev) => ({ ...prev, selectedTeamId: teamId }));
  const onChangeAwardName = (value: string) => setAwardState((prev) => ({ ...prev, awardName: value }));
  const onChangeAwardColor = (color: string) => setAwardState((prev) => ({ ...prev, awardColor: color }));

  const saveAward = () => {
    if (awardState.selectedTeamId === undefined) return;
    awardPatchMutation.mutate({
      teamId: awardState.selectedTeamId,
      awardName: awardState.awardName,
      awardColor: awardState.awardColor,
    });
  };

  const deleteAward = () => {
    if (awardState.selectedTeamId === undefined) return;
    awardPatchMutation.mutate({ teamId: awardState.selectedTeamId, awardName: null, awardColor: null });
    setAwardState((prev) => ({ ...prev, awardName: '', awardColor: '' }));
  };

  if (!contestId || !teamList) return null;

  return {
    awardPatchSectionAvailable,
    teamList,
    awardPatchSubmitAvailable,
    awardState,
    onSelectTeam,
    onChangeAwardName,
    onChangeAwardColor,
    saveAward,
    deleteAward,
    awardPatchMutation,
  };
};

export const useAwardCustomSortAdmin = () => {};
