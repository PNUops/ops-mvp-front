import { useQuery } from '@tanstack/react-query';
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
  isModalOpen: boolean;
  isEditModalOpen: boolean;
  editContestId: number;
};

const useContestAdmin = () => {
  const [state, setState] = useState<ContestAdminState>({
    contestName: '',
    currentContestName: '불러오는 중...',
    currentContestId: 1,
    contestTeams: [],
    isModalOpen: false,
    isEditModalOpen: false,
    editContestId: 0,
  });

  const { data: contests, refetch } = useQuery({
    queryKey: ['contests'],
    queryFn: getAllContests,
  });

  const toast = useToast();

  useEffect(() => {
    const loadInitialData = async () => {
      if (contests?.[0]) {
        const firstContest = contests[0];
        const teams = await getAllTeams(firstContest.contestId);

        setState((prev) => ({
          ...prev,
          currentContestName: firstContest.contestName,
          currentContestId: firstContest.contestId,
          contestTeams: teams,
        }));
      }
    };

    loadInitialData();
  }, [contests]);

  const handleAddContest = async () => {
    if (!state.contestName.trim()) {
      toast('대회명이 비어있습니다.', 'error');
      return;
    }

    try {
      await postAllContests(state.contestName);
      await refetch();
      setState((prev) => ({ ...prev, contestName: '' }));
      toast('대회가 추가되었습니다.', 'success');
    } catch (error) {
      setState((prev) => ({ ...prev, contestName: '' }));
      toast('대회 추가에 실패했습니다.', 'error');
    }
  };

  const handleDeleteContest = async (contestId: number) => {
    try {
      const teams = await getAllTeams(contestId);
      if (teams.length > 0) {
        setState((prev) => ({ ...prev, isModalOpen: true }));
        return;
      }

      await deleteContest(contestId);
      await refetch();
      toast('대회가 삭제되었습니다.', 'success');
    } catch (error) {
      toast('대회 삭제에 실패했습니다.', 'error');
    }
  };

  const handleContestChange = async (contestName: string, contestId: number) => {
    try {
      const teams = await getAllTeams(contestId);
      setState((prev) => ({
        ...prev,
        currentContestName: contestName,
        currentContestId: contestId,
        contestTeams: teams,
      }));
    } catch (error) {
      toast('팀 정보를 불러오는데 실패했습니다.', 'error');
    }
  };

  const handleDeleteTeam = async (teamId: number) => {
    try {
      await deleteTeams(teamId);
      const teams = await getAllTeams(state.currentContestId);
      setState((prev) => ({ ...prev, contestTeams: teams }));
      toast('팀이 삭제되었습니다.', 'success');
    } catch (error) {
      toast('팀 삭제에 실패했습니다.', 'error');
    }
  };

  const openDeleteModal = () => setState((prev) => ({ ...prev, isModalOpen: true }));
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
    openDeleteModal,
    openEditModal,
    closeEditModal,
    setContestName: (name: string) => setState((prev) => ({ ...prev, contestName: name })),
  };
};

export default useContestAdmin;
