import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTeamId } from 'hooks/useTeamId';
import { getProjectDetails } from 'apis/projectViewer';
import { ProjectDetailsResponseDto } from 'types/DTO/projectViewerDto';

import IntroSection from './IntroSection';
import UrlInput from './UrlInputSection';
import ImageUploader from './ImageUploaderSection';
import OverViewInput from './OverviewInput';

const ProjectEditorPage = () => {
  const teamId = useTeamId();
  const [overview, setOverview] = useState('');
  const [thumbnails, setThumbnails] = useState<File[]>([]);

  const { data } = useQuery<ProjectDetailsResponseDto>({
    queryKey: ['projectEditorInfo', teamId],
    queryFn: async () => {
      if (teamId === null) throw new Error('teamId is null');
      return await getProjectDetails(teamId);
    },
  });

  const { projectName, teamName, leaderName, participants } = data!;

  return (
    <div>
      <div className="text-title font-bold">프로젝트 생성</div>
      <div className="h-10" />

      <IntroSection {...{ projectName, teamName, leaderName, participants }} />
      <div className="h-15" />

      <UrlInput />
      <div className="h-15" />

      <ImageUploader thumbnails={thumbnails} setThumbnails={setThumbnails} />
      <div className="h-15" />

      <OverViewInput overview={overview} setOverview={setOverview} />

      <div className="h-20" />
      <div className="flex justify-center">
        <button className="bg-mainGreen rounded-full px-15 py-4 text-sm font-bold text-white">저장</button>
      </div>
    </div>
  );
};

export default ProjectEditorPage;