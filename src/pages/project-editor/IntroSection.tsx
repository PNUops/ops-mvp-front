import React from 'react';

import { TeamMember } from 'types/DTO/projectViewerDto';

interface IntroSectionProps {
  projectName: string;
  setProjectName: (projectName: string) => void;
  teamName: string;
  leaderName: string;
  teamMembers: TeamMember[];
}

const IntroSection = ({ teamName, leaderName, teamMembers, projectName, setProjectName }: IntroSectionProps) => {
  return (
    <>
      <div className="text-exsm flex gap-10 truncate sm:text-sm">
        <div className="text-midGray flex w-25 flex-col gap-3 pl-3">
          <span>팀명</span>
          <span>팀장</span>
          <span>팀원</span>
        </div>
        <div className="flex flex-col gap-3">
          <span>{teamName}</span>
          <span>{leaderName}</span>
          <div className="flex flex-wrap gap-x-3">
            {teamMembers.map((member, index) => (
              <span key={index}>{member.teamMemberName}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="h-10" />
      <div className="flex items-center gap-10">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span className="w-full text-nowrap">프로젝트명</span>
        </div>
        <div className="flex flex-1 flex-col">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="프로젝트 이름을 입력해주세요."
            className="placeholder-lightGray border-lightGray focus:border-mainGreen w-full truncate rounded border px-5 py-3 text-black duration-300 ease-in-out focus:outline-none"
          />
        </div>
      </div>
    </>
  );
};

export default IntroSection;
