import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from 'stores/useUserStore';
import useAuth from 'hooks/useAuth';
import { useTeamId } from 'hooks/useTeamId';
import { useToast } from 'hooks/useToast';
import { useContestStore } from './AdminInputSection/contestStore';

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

import { isValidGithubUrl, isValidYoutubeUrl, isValidProjectUrl } from './urlValidators';
import IntroSection from './IntroSection';
import UrlInput from './UrlInputSection';
import ImageUploaderSection from './ImageUploaderSection';
import OverviewInput from './OverviewInput';
import AdminInputSection from './AdminInputSection/AdminInputSection';
import { EditorDetailSkeleton } from './EditorSkeleton';

export interface PreviewImage {
  id?: number;
  url: string | File;
}

const ProjectEditorPage = () => {
  const { isAdmin, isLeader } = useAuth();
  const memberId = useUserStore((state) => state.user?.id);
  const teamId = useTeamId();
  const [thumbnail, setThumbnail] = useState<string | File | undefined>();
  const [thumbnailToDelete, setThumbnailToDelete] = useState<boolean>(false);
  const [previews, setPreviews] = useState<PreviewImage[]>([]);
  const [previewsToDelete, setPreviewsToDelete] = useState<number[]>([]);
  const [prodUrl, setProdUrl] = useState<string | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [overview, setOverview] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setSelectedContestId = useContestStore((state) => state.setSelectedContestId);
  const selectedContestId = useContestStore((state) => state.selectedContestId);

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

  if (isProjectLoading) return <EditorDetailSkeleton />;
  if (isProjectError || !projectData) return <div>데이터를 가져오지 못했습니다.</div>;

  useEffect(() => {
    if (projectData?.contestId) {
      setSelectedContestId(projectData.contestId);
    }
  }, [projectData?.contestId, setSelectedContestId]);

  const isLeaderOfThisTeam = isLeader && memberId == projectData.leaderId;
  if (!isLeaderOfThisTeam && !isAdmin) {
    return <div>접근 권한이 없습니다.</div>;
  }

  const handleSave = async () => {
    const contestIdToSubmit = selectedContestId;
    const validateProjectInputs = () => {
      if (!githubUrl) return '깃허브 링크가 입력되지 않았어요.';
      if (!youtubeUrl) return '유튜브 링크가 입력되지 않았어요.';
      if (!thumbnail && !previews.length) return '썸네일과 프리뷰 이미지가 모두 업로드되지 않았어요.';
      if (!thumbnail) return '썸네일이 업로드 되지 않았어요.';
      if (!previews.length) return '프리뷰 이미지가 업로드 되지 않았어요.';
      if (!overview) return '프로젝트 소개글이 작성되지 않았어요.';
      if (prodUrl && !isValidProjectUrl(prodUrl)) return '유효한 프로젝트 주소를 입력하세요.';
      if (!isValidGithubUrl(githubUrl)) return '유효한 깃헙 URL을 입력하세요.';
      if (!isValidYoutubeUrl(youtubeUrl)) return '유효한 유튜브 URL을 입력하세요.';
      return null;
    };

    const errorMessage = validateProjectInputs();
    if (errorMessage) {
      toast(errorMessage, 'error');
      return;
    }

    try {
      await patchProjectDetails(teamId, {
        contestId: isAdmin ? (contestIdToSubmit ?? projectData.contestId) : projectData.contestId,
        // TODO
        // teamName: isAdmin ? teamName : projectData.teamName,
        // projectName: isAdmin ? projectName : projectData.projectName,
        // leaderName: isAdmin ? leaderName : projectData.leaderName,
        teamName: projectData.teamName,
        projectName: projectData.projectName,
        leaderName: projectData.leaderName,
        overview,
        productionPath: prodUrl,
        githubPath: githubUrl,
        youTubePath: youtubeUrl,
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
      queryClient.invalidateQueries({ queryKey: ['projectEditorInfo', teamId] });
      queryClient.invalidateQueries({ queryKey: ['thumbnail', teamId] });
      queryClient.invalidateQueries({ queryKey: ['previewImages', teamId] });
      queryClient.invalidateQueries({ queryKey: ['projectDetails', teamId] });
      toast('저장이 완료되었습니다.', 'success');
      isLeaderOfThisTeam && navigate(`/teams/view/${teamId}`);
    } catch (err: any) {
      toast(err?.response?.data?.message || '저장 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className="px-5">
      <div className="text-title font-bold">프로젝트 생성/수정</div>
      <div className="h-10" />
      {isAdmin && <AdminInputSection projectName={projectData.projectName} teamName={projectData.teamName} />}

      {isLeaderOfThisTeam && (
        <IntroSection
          projectName={projectData.projectName}
          teamName={projectData.teamName}
          leaderName={projectData.leaderName}
          participants={projectData.teamMembers}
        />
      )}

      <div className="h-15" />

      <UrlInput
        prodUrl={prodUrl}
        setProdUrl={setProdUrl}
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

      <div className="flex justify-end gap-5 sm:gap-10">
        <button
          onClick={() => navigate(-1)}
          className="border-mainGreen hover:bg-whiteGray focus:bg-subGreen text-mainGreen rounded-full border px-4 py-2 font-bold hover:cursor-pointer focus:outline-none sm:px-15 sm:py-4"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="bg-mainGreen rounded-full px-4 py-2 text-sm font-bold text-white hover:cursor-pointer hover:bg-green-700 focus:bg-green-400 focus:outline-none sm:px-15 sm:py-4"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default ProjectEditorPage;
