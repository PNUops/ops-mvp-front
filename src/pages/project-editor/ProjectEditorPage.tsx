import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';
import { useTeamId } from 'hooks/useId';
import { useToast } from 'hooks/useToast';
import useProjectData from 'hooks/useProjectData';
import useImages from 'hooks/useImages';
import useImagesUpdate from 'hooks/useImagesUpdate';

import { getProjectDetails, getPreviewImages } from 'apis/projectViewer';
import { getThumbnail, patchProjectDetails, postMember, deleteMember } from 'apis/projectEditor';

import { TeamMember, ProjectDetailsResponseDto } from 'types/DTO/projectViewerDto';

import { isValidGithubUrl, isValidYoutubeUrl, isValidProjectUrl } from './urlValidators';
import IntroSection from './IntroSection';
import UrlInput from './UrlInputSection';
import ImageUploaderSection from './ImageUploaderSection';
import OverviewInput from './OverviewInput';
import { EditorDetailSkeleton } from './EditorSkeleton';

import AdminInputSection from '@pages/project-editor/AdminInputSection/AdminInputSection';

export interface PreviewImage {
  id?: number;
  url: string;
}

const ProjectEditorPage = () => {
  const { user, isAdmin, isLeader } = useAuth();
  const memberId = user?.id;
  const teamId = useTeamId();

  const [contestId, setContestId] = useState<number | null>(null);
  const [teamName, setTeamName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [leaderName, setLeaderName] = useState('');

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [prodUrl, setProdUrl] = useState<string | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [overview, setOverview] = useState('');

  const [currentThumbnail, setCurrentThumbnail] = useState<string | null>(null);
  const [thumbnailToUpload, setThumbnailToUpload] = useState<File | null>(null);
  const [thumbnailToDelete, setThumbnailToDelete] = useState<boolean>(false);

  const [currentPreviews, setCurrentPreviews] = useState<PreviewImage[]>([]);
  const [previewImagesToUpload, setPreviewImagesToUpload] = useState<File[]>([]);
  const [previewsToDelete, setPreviewsToDelete] = useState<number[]>([]);

  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!teamId) return <div>팀 정보를 불러올 수 없습니다.</div>;

  const { projectData, isProjectDataLoading, isProjectDataError } = useProjectData(teamId);

  const {
    thumbnailImage: fetchedThumbnailUrl,
    isThumbnailImageLoading,
    isThumbnailImageError,
    previewImages: fetchedPreviewData,
    isPreviewImagesLoading,
    isPreviewImagesError,
  } = useImages(teamId, projectData?.previewIds || []);

  const { updateImages } = useImagesUpdate(
    teamId,
    thumbnailToUpload,
    thumbnailToDelete,
    previewImagesToUpload,
    previewsToDelete,
  );

  useEffect(() => {
    if (projectData) {
      setContestId(projectData.contestId);
      setProjectName(projectData.projectName);
      setTeamName(projectData.teamName);
      setLeaderName(projectData.leaderName);
      setTeamMembers(projectData.teamMembers);
      setGithubUrl(projectData.githubPath);
      setYoutubeUrl(projectData.youTubePath);
      setProdUrl(projectData.productionPath);
      setOverview(projectData.overview);
    }
  }, [projectData]);

  useEffect(() => {
    if (fetchedThumbnailUrl) {
      setCurrentThumbnail(fetchedThumbnailUrl);
    }
  }, [fetchedThumbnailUrl]);

  useEffect(() => {
    if (fetchedPreviewData?.imageUrls && projectData?.previewIds) {
      const pairedPreviews: PreviewImage[] = fetchedPreviewData.imageUrls.map((url, index) => ({
        id: projectData.previewIds?.[index],
        url,
      }));
      setCurrentPreviews(pairedPreviews);
    }
  }, [fetchedPreviewData, projectData]);

  if (isProjectDataLoading || isThumbnailImageLoading || isPreviewImagesLoading) return <EditorDetailSkeleton />;
  if (isProjectDataError || !projectData || isThumbnailImageError || isPreviewImagesError) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

  const isLeaderOfThisTeam = isLeader && memberId == projectData.leaderId;
  if (!isLeaderOfThisTeam && !isAdmin) {
    return <div>접근 권한이 없습니다.</div>;
  }

  const handleSave = async () => {
    const contestIdToSubmit = contestId;

    const validateProjectInputs = () => {
      if (isAdmin) {
        if (!projectName) return '프로젝트명이 입력되지 않았어요.';
        if (!teamName) return '팀명이 입력되지 않았어요.';
      }
      if (isLeaderOfThisTeam) {
        if (!currentThumbnail && !currentPreviews.length) return '썸네일과 프리뷰 이미지가 모두 업로드되지 않았어요.';
        if (!currentThumbnail) return '썸네일이 업로드 되지 않았어요.';
        if (!currentPreviews.length) return '프리뷰 이미지가 업로드 되지 않았어요.';
      }
      if (!githubUrl) return '깃허브 링크가 입력되지 않았어요.';
      if (!youtubeUrl) return '유튜브 링크가 입력되지 않았어요.';

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
        teamName: isAdmin ? teamName : projectData.teamName,
        projectName: isAdmin ? projectName : projectData.projectName,
        leaderName: isAdmin ? leaderName : projectData.leaderName,
        overview,
        productionPath: prodUrl,
        githubPath: githubUrl,
        youTubePath: youtubeUrl,
      });

      const addedMembers = teamMembers.filter(
        (member) => !projectData.teamMembers.some((existing) => existing.teamMemberId === member.teamMemberId),
      );
      const removedMembers = projectData.teamMembers.filter(
        (member) => !teamMembers.some((existing) => existing.teamMemberId === member.teamMemberId),
      );

      const addMemberPromises = addedMembers.map(
        async (member) => await postMember(teamId, { teamMemberName: member.teamMemberName }),
      );
      const removeMemberPromises = removedMembers.map(
        async (member) => await deleteMember(teamId, member.teamMemberId),
      );

      await Promise.all([...addMemberPromises, ...removeMemberPromises]);

      toast('저장이 완료되었습니다.', 'success');
      (isLeaderOfThisTeam || isAdmin) && navigate(`/teams/view/${teamId}`);
    } catch (err: any) {
      toast(err?.response?.data?.message || '저장 중 오류가 발생했습니다.', 'error');
    }
  };

  const onMemberAdd = (newMemberName: string) => {
    setTeamMembers((prevMembers) => [...prevMembers, { teamMemberId: Date.now(), teamMemberName: newMemberName }]);
  };

  const onMemberRemove = (index: number) => {
    setTeamMembers((prevMembers) => prevMembers.filter((_, idx) => idx !== index));
  };

  return (
    <div className="px-5">
      <div className="text-title font-bold">프로젝트 생성/수정</div>
      <div className="h-10" />
      {isAdmin && (
        <AdminInputSection
          contestId={contestId}
          setContestId={setContestId}
          projectName={projectName}
          setProjectName={setProjectName}
          teamName={teamName}
          setTeamName={setTeamName}
          leaderName={leaderName}
          setLeaderName={setLeaderName}
          teamMembers={teamMembers}
          onMemberAdd={onMemberAdd}
          onMemberRemove={onMemberRemove}
        />
      )}

      {isLeaderOfThisTeam && (
        <IntroSection
          projectName={projectName}
          teamName={teamName}
          leaderName={leaderName}
          teamMembers={teamMembers} // WARN: 백엔드 측에서 필드명 바꿀 수도 있음 주의
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
      {isLeaderOfThisTeam && (
        <>
          <div className="h-15" />
          {/* <ImageUploaderSection
            thumbnail={currentThumbnail}
            setCurrentThumbnail={setCurrentThumbnail}
            previews={previews}
            setPreviews={setPreviews}
            setThumbnailToDelete={setThumbnailToDelete}
            previewsToDelete={previewsToDelete}
            setPreviewsToDelete={setPreviewsToDelete}
          /> */}
        </>
      )}

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
