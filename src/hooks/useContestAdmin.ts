import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllContests, postAllContests, deleteContest } from 'apis/contests';
import { createProjectDetails } from 'apis/projectEditor';
import { getAllTeams, deleteTeams } from 'apis/teams';
import { useToast } from 'hooks/useToast';
import { TeamListItemResponseDto } from 'types/DTO/teams/teamListDto';

type DeleteModalState = {
  type: 'contest' | 'team' | null;
  targetId: number | null;
};

type ContestAdminState = {
  contestName: string;
  currentContestName: string;
  currentContestId: number;
  contestTeams: TeamListItemResponseDto[];
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  editContestId: number;
};

const useContestAdmin = () => {
  const [state, setState] = useState<ContestAdminState>({
    contestName: '',
    currentContestName: '불러오는 중...',
    currentContestId: 1,
    contestTeams: [],
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    editContestId: 0,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    type: null,
    targetId: null,
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
  const navigate = useNavigate();
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

  const handleCreateTeam = async (teamId: number) => {
    try {
      const response = await createProjectDetails({
        contestId: teamId,
        teamName: '팀 이름',
        projectName: '프로젝트 이름',
        leaderName: '팀장 이름',
        overview: '프로젝트 소개글',
        productionPath: '',
        githubPath: 'https://github.com/2025-PNU-SW-Hackathon',
        youTubePath: 'https://youtu.be/CYoK_cuG8lU',
      });
      const createdTeamId = response.teamId;
      toast('저장이 완료되었습니다.', 'success');
      navigate(`/teams/edit/${createdTeamId}`);
    } catch (err: any) {
      toast(err?.response?.data?.message || '저장 중 오류가 발생했습니다.', 'error');
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
      await queryClient.invalidateQueries({ queryKey: ['contests'] });
      toast('대회가 삭제되었습니다.', 'success');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '대회 삭제에 실패했습니다.';
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

  const handleDelete = async () => {
    if (!deleteModal.type || !deleteModal.targetId) return;
    if (deleteModal.type === 'contest') {
      await handleDeleteContest(deleteModal.targetId);
    } else if (deleteModal.type === 'team') {
      await handleDeleteTeam(deleteModal.targetId);
    }
    setState((prev) => ({ ...prev, isDeleteModalOpen: false }));
    setDeleteModal({ type: null, targetId: null });
  };

  const openDeleteModal = (type: 'contest' | 'team', targetId: number) => {
    setState((prev) => ({ ...prev, isDeleteModalOpen: true }));
    setDeleteModal({ type, targetId });
  };

  const closeDeleteModal = () => {
    setState((prev) => ({ ...prev, isDeleteModalOpen: false }));
    setDeleteModal({ type: null, targetId: null });
  };

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
    handleCreateTeam,
    handleContestChange,
    openDeleteModal,
    closeDeleteModal,
    openEditModal,
    closeEditModal,
    setContestName: (name: string) => setState((prev) => ({ ...prev, contestName: name })),
    deleteModal,
    handleDelete,
  };
};

export default useContestAdmin;
