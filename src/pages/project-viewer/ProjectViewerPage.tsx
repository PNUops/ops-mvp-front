import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTeamId } from 'hooks/useId';
import useAuth from 'hooks/useAuth';
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
  const { isLeader, isAdmin } = useAuth();
  const memberId = useUserStore((state) => state.user?.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ['projectDetails', teamId],
    queryFn: async () => {
      if (teamId === null) throw new Error('teamId is null');
      return getProjectDetails(teamId);
    },
    staleTime: 0,
    refetchOnMount: true,
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

  const isLeaderOfThisTeam = isLeader && memberId == data.leaderId;

  return (
    <div className="px-5">
      <IntroSection
        contestId={data.contestId}
        teamId={data.teamId}
        isEditor={isLeaderOfThisTeam || isAdmin}
        projectName={data.projectName}
        teamName={data.teamName}
        productionUrl={data.productionPath}
        githubUrl={data.githubPath}
        youtubeUrl={data.youTubePath}
      />
      <div className="h-10" />
      <CarouselSection
        teamId={data.teamId}
        previewIds={data.previewIds}
        youtubeUrl={data.youTubePath}
        isEditor={isLeaderOfThisTeam || isAdmin}
      />
      <div className="h-10" />
      <LikeSection teamId={data.teamId} isLiked={data.isLiked} />
      <div className="h-10" />
      <DetailSection overview={data.overview} leaderName={data.leaderName} teamMembers={data.teamMembers} />
      {/* WARN: 백엔드 측에서 필드명 바꿀 수도 있음 주의*/}
      <div className="h-28" />
      <CommentSection teamId={data.teamId} memberId={memberId} />
    </div>
  );
};

export default ProjectViewerPage;
