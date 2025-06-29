import React from 'react';

interface IntroSectionProps {
  projectName: string;
  teamName: string;
  leaderName: string;
  participants: string[];
}

const IntroSection = ({ projectName, teamName, leaderName, participants }: IntroSectionProps) => {
  return (
    <div className="flex gap-10 truncate text-sm">
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
          {participants.map((name, index) => (
            <span key={index}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
