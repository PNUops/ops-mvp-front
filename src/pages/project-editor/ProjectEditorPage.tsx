import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from 'stores/useUserStore';
import { useTeamId } from 'hooks/useTeamId';
import { getProjectDetails, getPreviewImages } from 'apis/projectViewer';
import {
  getThumbnail,
  patchProjectDetails,
  postPreview,
  postThumbnail,
  deletePreview,
  deleteThumbnail,
} from 'apis/projectEditor';
import { ProjectDetailsResponseDto } from 'types/DTO/projectViewerDto';
import { useToast } from 'hooks/useToast';
import IntroSection from './IntroSection';
import UrlInput from './UrlInputSection';
import ImageUploaderSection from './ImageUploaderSection';
import OverviewInput from './OverviewInput';
import { useNavigate } from 'react-router-dom';

export interface PreviewImage {
  id?: number;
  url: string | File;
}

const ProjectEditorPage = () => {
  const memberId = useUserStore((state) => state.user?.id);
  const teamId = useTeamId();
  const [thumbnail, setThumbnail] = useState<string | File | undefined>();
  const [thumbnailToDelete, setThumbnailToDelete] = useState<boolean>(false);
  const [previews, setPreviews] = useState<PreviewImage[]>([]);
  const [previewsToDelete, setPreviewsToDelete] = useState<number[]>([]);
  const [githubUrl, setGithubUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [overview, setOverview] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

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

  const { data: thumbnailUrl } = useQuery({
    queryKey: ['thumbnail', teamId],
    queryFn: async () => {
      if (teamId === null) throw new Error('teamId is null');
      return await getThumbnail(teamId);
    },
    enabled: teamId !== null,
  });

  const { data: previewData } = useQuery({
    queryKey: ['previewImages', teamId, projectData?.previewIds],
    queryFn: async () => {
      if (teamId === null || !projectData?.previewIds) throw new Error('previewIds 없음');
      return await getPreviewImages(teamId, projectData.previewIds);
    },
    enabled: teamId !== null && !!projectData?.previewIds?.length,
  });

  useEffect(() => {
    if (projectData) {
      setGithubUrl(projectData.githubPath);
      setYoutubeUrl(projectData.youtubePath);
      setOverview(projectData.overview);
    }
  }, [projectData]);

  useEffect(() => {
    if (thumbnailUrl && typeof thumbnailUrl === 'string') {
      setThumbnail(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  useEffect(() => {
    if (previewData?.imageUrls && projectData?.previewIds) {
      const paired = previewData.imageUrls.map((url, index) => ({
        id: projectData.previewIds?.[index],
        url,
      }));
      setPreviews(paired);
    }
  }, [previewData, projectData]);

  if (!teamId) return <div>팀 정보를 불러올 수 없습니다.</div>;
  if (isProjectLoading) return <div>로딩 중...</div>;
  if (isProjectError || !projectData) return <div>데이터를 가져오지 못했습니다.</div>;
  if (memberId !== projectData.leaderId) return <div>접근 권한이 없습니다.</div>;

  const handleSave = async () => {
    if (!teamId) return;
    if (!thumbnail || !previews) {
      if (!thumbnail && !previews) {
        alert('썸네일과 프리뷰 이미지가 모두 업로드되지 않았어요.');
      } else if (!thumbnail) {
        alert('썸네일이 업로드 되지 않았어요.');
      } else {
        alert('프리뷰 이미지가 업로드 되지 않았어요.');
      }
      return;
    }

    try {
      await patchProjectDetails(teamId, {
        githubPath: githubUrl,
        youTubePath: youtubeUrl,
        overview,
      });

      if (thumbnailToDelete) {
        await deleteThumbnail(teamId);
      }
      if (thumbnail instanceof File) {
        const formData = new FormData();
        formData.append('image', thumbnail);
        await postThumbnail(teamId, formData);
      }

      if (previewsToDelete.length > 0) {
        await deletePreview(teamId, { imageIds: previewsToDelete });
      }
      const newFiles = previews.filter((p) => p.url instanceof File).map((p) => p.url as File);
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => formData.append('images', file));
        await postPreview(teamId, formData);
      }
      toast('저장이 완료되었습니다.', 'success');
      navigate(`/teams/view/${teamId}`);
    } catch (err: any) {
      toast(err?.response?.data?.message || '저장 중 오류가 발생했습니다.', 'error');
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

      <ImageUploaderSection
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        previews={previews}
        setPreviews={setPreviews}
        setThumbnailToDelete={setThumbnailToDelete}
        previewsToDelete={previewsToDelete}
        setPreviewsToDelete={setPreviewsToDelete}
      />

      <div className="h-15" />

      <OverviewInput overview={overview} setOverview={setOverview} />

      <div className="h-20" />

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="bg-mainGreen rounded-full px-15 py-4 text-sm font-bold text-white hover:cursor-pointer"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default ProjectEditorPage;
