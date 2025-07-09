import { TeamMember } from 'types/DTO/projectViewerDto';
import { TeamMemberCreateRequestDto } from 'types/DTO/projectEditorDto';

interface MemberChanges {
  teamMemberNamesToAdd: TeamMemberCreateRequestDto[];
  teamMemberIdsToRemove: number[];
}

export const getMemberChanges = (currentMembers: TeamMember[], originalMembers: TeamMember[]): MemberChanges => {
  const originalMembersMap = new Map(originalMembers.map((member) => [member.teamMemberId, member]));
  const currentMembersMap = new Map(currentMembers.map((member) => [member.teamMemberId, member]));

  const teamMemberNamesToAdd: TeamMemberCreateRequestDto[] = [];
  const teamMemberIdsToRemove: number[] = [];

  for (const member of currentMembers) {
    if (!originalMembersMap.has(member.teamMemberId)) {
      teamMemberNamesToAdd.push({ teamMemberName: member.teamMemberName });
    }
  }

  for (const member of originalMembers) {
    if (!currentMembersMap.has(member.teamMemberId)) {
      teamMemberIdsToRemove.push(member.teamMemberId);
    }
  }

  return { teamMemberNamesToAdd, teamMemberIdsToRemove };
};
