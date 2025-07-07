import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { getAllContests, postAllContests, deleteContest } from 'apis/contests';
import { getAllTeams, deleteTeams } from 'apis/teams';
import { useToast } from 'hooks/useToast';
import { TeamListItemResponseDto } from 'types/DTO/teams/teamListDto';

type ContestAdminState = {
  contestName: string;
  currentContestName: string;
  currentContestId: number;
  contestTeams: TeamListItemResponseDto[];
  // isModalOpen: boolean;
  isEditModalOpen: boolean;
  editContestId: number;
};

const useContestAdmin = () => {
  const [state, setState] = useState<ContestAdminState>({
    contestName: '',
    currentContestName: '불러오는 중...',
    currentContestId: 1,
    contestTeams: [],
    // isModalOpen: false,
    isEditModalOpen: false,
    editContestId: 0,
  });

  const { data: contests, refetch: refetchContests } = useQuery({
    queryKey: ['contests'],
    queryFn: getAllContests,
    staleTime: 0,
  });

  const { data: currentTeams, refetch: refetchTeams } = useQuery({
    queryKey: ['teams', state.currentContestId],
    queryFn: async () => {
      const teams = await getAllTeams(state.currentContestId);
      return teams.sort((a, b) => a.teamId - b.teamId);
    },
    enabled: state.currentContestId > 0,
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (contests?.[0] && state.currentContestName === '불러오는 중...') {
      const firstContest = contests[0];
      setState((prev) => ({
        ...prev,
        currentContestName: firstContest.contestName,
        currentContestId: firstContest.contestId,
      }));
    }
  }, [contests, state.currentContestName]);

  useEffect(() => {
    if (currentTeams) {
      setState((prev) => ({ ...prev, contestTeams: currentTeams }));
    }
  }, [currentTeams]);

  const handleAddContest = async () => {
    if (!state.contestName.trim()) {
      toast('대회명이 비어있습니다.', 'error');
      return;
    }

    try {
      await postAllContests(state.contestName);
      console.log('대회 추가 후 캐시 무효화');
      await queryClient.invalidateQueries({ queryKey: ['contests'] });
      setState((prev) => ({ ...prev, contestName: '' }));
      toast('대회가 추가되었습니다.', 'success');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '대회 추가에 실패했습니다.';
      toast(errorMessage, 'error');
      setState((prev) => ({ ...prev, contestName: '' }));
    }
  };

  const handleDeleteContest = async (contestId: number) => {
    try {
      const teams = await getAllTeams(contestId);
      if (teams.length > 0) {
        toast('팀이 남아있으면 삭제할 수 없습니다.', 'info');
        return;
      }

      await deleteContest(contestId);
      console.log('대회 삭제 후 캐시 무효화');
      await queryClient.invalidateQueries({ queryKey: ['contests'] });
      toast('대회가 삭제되었습니다.', 'success');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '대회 삭제에 실패했습니다.';
      toast(errorMessage, 'error');
    }
  };

  const handleContestChange = async (contestName: string, contestId: number) => {
    try {
      setState((prev) => ({
        ...prev,
        currentContestName: contestName,
        currentContestId: contestId,
      }));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '팀 정보를 불러오는데 실패했습니다.';
      toast(errorMessage, 'error');
    }
  };

  const handleDeleteTeam = async (teamId: number) => {
    try {
      await deleteTeams(teamId);
      await queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast('팀이 삭제되었습니다.', 'success');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '팀 삭제에 실패했습니다.';
      toast(errorMessage, 'error');
    }
  };

  const closeDeleteModal = () => setState((prev) => ({ ...prev, isModalOpen: false }));
  const openEditModal = (contestId: number) =>
    setState((prev) => ({
      ...prev,
      isEditModalOpen: true,
      editContestId: contestId,
    }));
  const closeEditModal = () => setState((prev) => ({ ...prev, isEditModalOpen: false }));

  return {
    state,
    contests,
    toast,
    handleAddContest,
    handleDeleteContest,
    handleContestChange,
    handleDeleteTeam,
    closeDeleteModal,
    openEditModal,
    closeEditModal,
    setContestName: (name: string) => setState((prev) => ({ ...prev, contestName: name })),
  };
};

export default useContestAdmin;
