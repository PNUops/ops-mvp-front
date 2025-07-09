import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from './useToast';

import { patchProjectDetails, postMember, deleteMember } from 'apis/projectEditor';
import { ProjectDetailsEditDto, TeamMemberCreateRequestDto } from 'types/DTO/projectEditorDto';

const usePatchProjectData = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: ({ teamId, projectDataToPatch }: { teamId: number; projectDataToPatch: ProjectDetailsEditDto }) =>
      patchProjectDetails(teamId, projectDataToPatch),
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['projectData', variables.teamId] }),
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
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['projectData', variables.teamId] }),
    onError: () => toast('팀원 추가에 실패했어요', 'error'),
  });
};

const useRemoveTeamMembers = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: async ({ teamId, teamMemberIdsToRemove }: { teamId: number; teamMemberIdsToRemove: number[] }) => {
      await Promise.all(teamMemberIdsToRemove.map((id) => deleteMember(teamId, id)));
    },
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['projectData', variables.teamId] }),
    onError: () => toast('팀원 삭제에 실패했어요', 'error'),
  });
};

interface UpdateProjectDataParams {
  teamId: number;
  projectDataToPatch: ProjectDetailsEditDto;
  teamMemberNamesToAdd: TeamMemberCreateRequestDto[];
  teamMemberIdsToRemove: number[];
}

const useProjectDateUpdate = () => {
  const toast = useToast();

  const { mutateAsync: patchProjectDataMutate } = usePatchProjectData();
  const { mutateAsync: addMembersMutate } = useAddTeamMembers();
  const { mutateAsync: removeMembersMutate } = useRemoveTeamMembers();

  const updateProjectData = async ({
    teamId,
    projectDataToPatch,
    teamMemberNamesToAdd,
    teamMemberIdsToRemove,
  }: UpdateProjectDataParams) => {
    try {
      const promises: Promise<any>[] = [];

      promises.push(patchProjectDataMutate({ teamId, projectDataToPatch }));

      if (teamMemberNamesToAdd.length > 0) {
        promises.push(addMembersMutate({ teamId, teamMemberNamesToAdd }));
      }

      if (teamMemberIdsToRemove.length > 0) {
        promises.push(removeMembersMutate({ teamId, teamMemberIdsToRemove }));
      }

      await Promise.all(promises);
    } catch (error) {
      toast('프로젝트 수정 중 알 수 없는 오류가 발생했어요', 'error');
      throw error;
    }
  };
  return { updateProjectData };
};

export default useProjectDateUpdate;
