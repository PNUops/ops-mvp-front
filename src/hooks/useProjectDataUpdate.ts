import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from './useToast';

import { patchProjectDetails, postMember, deleteMember } from 'apis/projectEditor';
import { ProjectDetailsEditDto, TeamMemberCreateRequestDto } from 'types/DTO/projectEditorDto';
import { useInitialValue } from '@dnd-kit/core/dist/hooks/utilities';
import { add } from '@dnd-kit/utilities';

const usePatchProjectData = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: ({ teamId, projectDataToPatch }: { teamId: number; projectDataToPatch: ProjectDetailsEditDto }) =>
      patchProjectDetails(teamId, projectDataToPatch),
    onSuccess: (teamId) => queryClient.invalidateQueries({ queryKey: ['projectData', teamId] }),
    onError: () => toast('프로젝트 정보 수정에 실패했어요', 'error'),
  });
};

const useAddTeamMembers = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: async ({
      teamId,
      teamMemberNamesToAdd,
    }: {
      teamId: number;
      teamMemberNamesToAdd: TeamMemberCreateRequestDto[];
    }) => {
      await Promise.all(teamMemberNamesToAdd.map((name) => postMember(teamId, name)));
    },
    onSuccess: (teamId) => queryClient.invalidateQueries({ queryKey: ['projectData', teamId] }),
    onError: () => toast('팀원 추가에 실패했어요', 'error'),
  });
};

const useRemoveTeamMembers = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: async ({ teamId, teamMemberIdsToRemove }: { teamId: number; teamMemberIdsToRemove: number[] }) => {
      await Promise.all(teamMemberIdsToRemove.map((id) => deleteMember(teamId, id)));
    },
    onSuccess: (teamId) => queryClient.invalidateQueries({ queryKey: ['projectData', teamId] }),
    onError: () => toast('팀원 삭제에 실패했어요', 'error'),
  });
};

const useProjectDateUpdate = (
  teamId: number,
  projectDataToPatch: ProjectDetailsEditDto,
  teamMemberNamesToAdd: TeamMemberCreateRequestDto[],
  teamMemberIdsToRemove: number[],
) => {
  const toast = useToast();

  const { mutate: patchProjectDataMutate } = usePatchProjectData();
  const { mutate: addMembersMutate } = useAddTeamMembers();
  const { mutate: removeMembersMutate } = useRemoveTeamMembers();

  const updateProjectData = () => {
    try {
      patchProjectDataMutate({ teamId, projectDataToPatch });
      if (teamMemberNamesToAdd.length > 0) {
        addMembersMutate({ teamId, teamMemberNamesToAdd });
      }
      if (teamMemberIdsToRemove.length > 0) {
        removeMembersMutate({ teamId, teamMemberIdsToRemove });
      }
    } catch (error) {
      toast('프로젝트 수정 중 알 수 없는 오류가 발생했어요', 'error');
    }

    return { updateProjectData };
  };
};

export default useProjectDateUpdate;
