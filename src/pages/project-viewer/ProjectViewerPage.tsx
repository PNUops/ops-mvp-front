import React, { useState, useRef, useEffect } from 'react';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { useTeamId } from 'hooks/useTeamId';
import { useUserStore } from 'stores/useUserStore';
import { getProjectDetails } from 'apis/projectViewer';

import IntroSection from './IntroSection';
import CarouselSection from './CarouselSection';
import LikeSection from './LikeSection';
import DetailSection from './DetailSection';
import CommentSection from './CommentSection/CommentSection';

import {
  IntroSectionSkeleton,
  CarouselSectionSkeleton,
  LikeSectionSkeleton,
  DetailSectionSkeleton,
  MediaSectionSkeleton,
  CommentSectionSkeleton,
} from './ViewerSkeleton';

const ProjectViewerPage = () => {
  const teamId = useTeamId();
  const memberId = useUserStore((state) => state.user?.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ['projectDetails', teamId],
    queryFn: async () => {
      if (teamId === null) throw new Error('teamId is null');
      return await getProjectDetails(teamId);
    },
  });

  if (isLoading) {
    return (
      <div>
        <IntroSectionSkeleton />
        <div className="h-5" />
        <CarouselSectionSkeleton />
        <div className="h-7" />
        <LikeSectionSkeleton />
        <div className="h-20" />
        <DetailSectionSkeleton />
        <div className="h-20" />
        <MediaSectionSkeleton />
        <div className="h-20" />
        <CommentSectionSkeleton />
      </div>
    );
  }

  if (error) return <div>에러 발생: {String(error)}</div>;
  if (!data) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <div>
      <IntroSection
        teamId={data.teamId}
        leaderId={data.leaderId}
        projectName={data.projectName}
        teamName={data.teamName}
        githubUrl={data.githubPath}
        youtubeUrl={data.youtubePath}
      />
      <div className="h-10" />
      <CarouselSection teamId={data.teamId} previewIds={data.previewIds} />
      <div className="h-10" />
      <LikeSection teamId={data.teamId} isLiked={data.isLiked} />
      <div className="h-10" />
      <DetailSection overview={data.overview} leaderName={data.leaderName} participants={data.participants} />
      <div className="h-30" />
      <CommentSection teamId={data.teamId} memberId={memberId ?? -1} />
    </div>
  );
};

export default ProjectViewerPage;
