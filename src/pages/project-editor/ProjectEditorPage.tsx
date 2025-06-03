import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from 'stores/useUserStore';
import { useTeamId } from 'hooks/useTeamId';
import { getProjectDetails, getPreviewImages} from 'apis/projectViewer';
import { getThumbnail, patchProjectDetails, postThumbnail, postPreview } from 'apis/projectEditor';
import { ProjectDetailsResponseDto } from 'types/DTO/projectViewerDto';

import IntroSection from './IntroSection';
import UrlInput from './UrlInputSection';
import ImageUploaderSection from './ImageUploaderSection';
import OverviewInput from './OverviewInput';

const ProjectEditorPage = () => {
  const memberId = useUserStore((state) => state.user?.id);
  const teamId = useTeamId();
  if (!teamId) return <div>팀 정보를 불러올 수 없습니다.</div>;

 const {
   data: projectData,
   isLoading: isProjectLoading,
   isError: isProjectError,
 } = useQuery<ProjectDetailsResponseDto>({
   queryKey: ['projectEditorInfo', teamId],
   queryFn: async () => {
     if (teamId === null) throw new Error('teamId is null');
     return await getProjectDetails(teamId);
   },
   enabled: teamId !== null,
 });

 if (isProjectLoading) return <div>로딩 중...</div>;
 if (isProjectError || !projectData) return <div>데이터를 가져오지 못했습니다.</div>;
 if (memberId !== projectData?.leaderId) return <div>접근 권한이 없습니다.</div>;

 const {
   data: thumbnailUrl,
   isLoading: isThumbnailLoading,
   isError: isThumbnailError,
 } = useQuery({
   queryKey: ['thumbnail', teamId],
   queryFn: async () => {
    if (teamId === null) throw new Error('teamId is null');
    return await getThumbnail(teamId);
   },
   enabled: teamId !== null,
 });

   const {
     data: previewData,
     isLoading: isPreviewLoading,
     isError: isPreviewError,
   } = useQuery({
     queryKey: ['previewImages', teamId, projectData?.previewIds],
     queryFn: async () => {
        if (teamId === null || !projectData?.previewIds) throw new Error('previewIds 없음');
        return await getPreviewImages(teamId, projectData.previewIds);
     },
     enabled: teamId !== null && !!projectData?.previewIds,
   });

  const [githubUrl, setGithubUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [thumbnail, setThumbnail] = useState<File | string | undefined>();
  const [previews, setPreviews] = useState<(File | string)[]>([]);
  const [overview, setOverview] = useState('');

  useEffect(() => {
    if (projectData) {
      setGithubUrl(projectData.githubPath);
      setYoutubeUrl(projectData.youtubePath);
      setOverview(projectData.overview);
    }
  }, [projectData]);

  useEffect(() => {
    setThumbnail(thumbnailUrl);
  }, [thumbnailUrl]);

  useEffect(() => {
    if (previewData?.imageUrls) {
      setPreviews(previewData.imageUrls);
    }
  }, [previewData]);

  useEffect(() => {
    if (typeof thumbnailUrl !== 'string') return;
    setThumbnail(thumbnailUrl);

    return () => {
      URL.revokeObjectURL(thumbnailUrl);
    };
  }, [thumbnailUrl]);

  useEffect(() => {
    if (!previewData?.imageUrls) return;
    setPreviews(previewData.imageUrls);

    return () => {
      previewData.imageUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previewData]);

  const handleSave = async () => {
    if (!teamId) {
      alert('팀 정보를 불러올 수 없습니다.');
      return;
    }

    try {
      await patchProjectDetails(teamId, {
        overview,
        githubPath: githubUrl,
        youTubePath: youtubeUrl, // NOT youtube. It's youTube!!
      });

      if (thumbnail instanceof File) {
        const formData = new FormData();
        formData.append('image', thumbnail);
        await postThumbnail(teamId, formData);
      }

      const previewFiles = previews.filter((p): p is File => p instanceof File);
      if (previewFiles.length > 0) {
        const formData = new FormData();
        previewFiles.forEach((file) => formData.append('images', file));
        await postPreview(teamId, formData);
      }

      alert('저장 완료!');
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || '저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <div className="text-title font-bold">프로젝트 생성</div>
      <div className="h-10" />

      <IntroSection
        projectName={projectData.projectName}
        teamName={projectData.teamName}
        leaderName={projectData.leaderName}
        participants={projectData.participants}
      />
      <div className="h-15" />
      <UrlInput
        githubUrl={githubUrl}
        setGithubUrl={setGithubUrl}
        youtubeUrl={youtubeUrl}
        setYoutubeUrl={setYoutubeUrl}
      />
      <div className="h-15" />
      <ImageUploaderSection teamId={teamId} thumbnail={thumbnail} setThumbnail={setThumbnail} previews={previews} setPreviews={setPreviews} />
      <div className="h-15" />
      <OverviewInput overview={overview} setOverview={setOverview} />
      <div className="h-20" />
      <div className="flex justify-center">
        <button onClick={handleSave} className="bg-mainGreen rounded-full px-15 py-4 text-sm font-bold text-white">저장</button>
      </div>
    </div>
  );
};

export default ProjectEditorPage;