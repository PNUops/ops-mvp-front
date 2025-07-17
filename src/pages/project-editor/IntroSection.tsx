import React from 'react';

import { TeamMember } from 'types/DTO/projectViewerDto';

interface IntroSectionProps {
  projectName: string;
  teamName: string;
  leaderName: string;
  teamMembers: TeamMember[];
}

const IntroSection = ({ projectName, teamName, leaderName, teamMembers }: IntroSectionProps) => {
  return (
    <div className="text-exsm flex gap-10 truncate sm:text-sm">
      <div className="text-midGray flex w-25 flex-col gap-3 pl-3">
        <span>프로젝트</span>
        <span>팀명</span>
        <span>팀장</span>
        <span>팀원</span>
      </div>
      <div className="flex flex-col gap-3">
        <span>{projectName}</span>
        <span>{teamName}</span>
        <span>{leaderName}</span>
        <div className="flex flex-wrap gap-x-3">
          {teamMembers.map((member, index) => (
            <span key={index}>{member.teamMemberName}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
