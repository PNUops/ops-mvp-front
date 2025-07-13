import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { Query } from '@tanstack/react-query';

import useAuth from 'hooks/useAuth';
import { useContestId, useTeamId } from 'hooks/useId';
import { useToast } from 'hooks/useToast';

import { getProjectDetails, getPreviewImages } from 'apis/projectViewer';
import {
  createProjectDetails,
  getThumbnail,
  patchProjectDetails,
  postPreview,
  postThumbnail,
  deletePreview,
  deleteThumbnail,
  postMember,
  deleteMember,
} from 'apis/projectEditor';

import {
  TeamMember,
  PreviewImagesResponseDto,
  ProjectDetailsResponseDto,
  PreviewImage,
} from 'types/DTO/projectViewerDto';

import { isValidGithubUrl, isValidYoutubeUrl, isValidProjectUrl } from './urlValidators';
import IntroSection from './IntroSection';
import UrlInput from './UrlInput';
import ImageUploaderSection from './ImageUploaderSection';
import OverviewInput from './OverviewInput';
import { EditorDetailSkeleton } from './EditorSkeleton';

import AdminEditSection from '@pages/project-editor/AdminEditSection/AdminEditSection';
import MembersInput from './AdminEditSection/MembersInput';

interface ProjectEditorPageProps {
  mode: 'edit' | 'create';
}

const ProjectEditorPage = ({ mode }: ProjectEditorPageProps) => {
  const { user, isAdmin, isLeader } = useAuth();
  const memberId = user?.id;
  const teamId = useTeamId();
  const initialContestId = useContestId();

  const isEditMode = mode === 'edit';
  const isCreateMode = mode === 'create';

  const [contestId, setContestId] = useState<number | null>(initialContestId ?? null);
  const [teamName, setTeamName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [thumbnail, setThumbnail] = useState<string | File | undefined>();
  const [thumbnailToDelete, setThumbnailToDelete] = useState<boolean>(false);
  const [previews, setPreviews] = useState<PreviewImage[]>([]);
  const [previewsToDelete, setPreviewsToDelete] = useState<number[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const teamMembersRef = useRef<TeamMember[]>(teamMembers);
  const [productionUrl, setProductionUrl] = useState<string | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [overview, setOverview] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    enabled: isEditMode && teamId !== null,
  });

  const { data: thumbnailUrl } = useQuery<string>({
    queryKey: ['thumbnail', teamId],
    queryFn: async () => {
      if (teamId === null) throw new Error('teamId is null');
      return await getThumbnail(teamId);
    },
    enabled: teamId !== null,
    refetchInterval: (query) => {
      const shouldRefetch = query.state.data === 'THUMBNAIL_ERR_409';
      return shouldRefetch ? 1500 : false;
    },
  });

  const { data: previewData } = useQuery<PreviewImagesResponseDto>({
    queryKey: ['previewImages', teamId, projectData?.previewIds],
    queryFn: async () => {
      if (teamId === null || !projectData?.previewIds) throw new Error('previewIds 없음');
      return await getPreviewImages(teamId, projectData.previewIds);
    },
    enabled: teamId !== null && !!projectData?.previewIds?.length,
    refetchInterval: (query) => {
      const data = query.state.data;
      const shouldRefetch = data?.imageUrls?.every((url) => url === 'PREVIEW_ERR_409') ?? false;
      return shouldRefetch ? 1500 : false;
    },
  });

  useEffect(() => {
    if (projectData) {
      setContestId(projectData.contestId);
      setTeamName(projectData.teamName);
      setProjectName(projectData.projectName);
      setLeaderName(projectData.leaderName);
      setTeamMembers(projectData.teamMembers);
      setGithubUrl(projectData.githubPath);
      setYoutubeUrl(projectData.youTubePath);
      setProductionUrl(projectData.productionPath);
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

  useEffect(() => {
    teamMembersRef.current = teamMembers;
  }, [teamMembers]);

  if ((isCreateMode && !initialContestId) || (isEditMode && !contestId))
    return <div>프로젝트의 대회 소속을 불러올 수 없습니다.</div>;
  if (!teamId && isEditMode) return <div>팀 정보를 불러올 수 없습니다.</div>;

  if (isProjectLoading) return <EditorDetailSkeleton />;
  if ((isProjectError || !projectData) && isEditMode) return <div>데이터를 가져오지 못했습니다.</div>;

  const isLeaderOfThisTeam = isLeader && isEditMode && projectData && memberId === projectData.leaderId;
  if (!isLeaderOfThisTeam && !isAdmin) {
    return <div>접근 권한이 없습니다.</div>;
  }

  const isEmpty = (value?: string | null) => !value || value.trim() === '';

  const validateCommonFields = () => {
    if (teamMembers.length < 1) return '등록된 팀원이 없어요.';
    if (productionUrl && !isValidProjectUrl(productionUrl)) return '유효한 프로젝트 주소를 입력하세요.';
    if (!isValidGithubUrl(githubUrl)) return '유효한 깃헙 URL을 입력하세요.';
    if (!isValidYoutubeUrl(youtubeUrl)) return '유효한 유튜브 URL을 입력하세요.';
  };

  const validateCreateInputs = () => {
    if (contestId === null) return '대회 종류를 설정해야 해요.';
    if (isEmpty(projectName)) return '프로젝트명이 입력되지 않았어요.';
    if (isEmpty(teamName)) return '팀명이 입력되지 않았어요.';
    if (isEmpty(leaderName)) return '팀장명이 입력되지 않았어요.';
    if (isEmpty(githubUrl)) return '깃허브 링크가 입력되지 않았어요.';
    if (!isValidGithubUrl(githubUrl)) return '유효한 깃헙 URL을 입력하세요.';
    if (isEmpty(youtubeUrl)) return '유튜브 링크가 입력되지 않았어요.';
    if (!isValidYoutubeUrl(youtubeUrl)) return '유효한 유튜브 URL을 입력하세요.';
    if (productionUrl && !isValidProjectUrl(productionUrl)) return '유효한 프로젝트 주소를 입력하세요.';
    if (isEmpty(overview)) return '프로젝트 소개글이 작성되지 않았어요.';
    if (!thumbnail && !previews.length) return '썸네일과 프리뷰 이미지가 모두 업로드되지 않았어요.';
    if (!thumbnail) return '썸네일이 업로드 되지 않았어요.';
    if (previews.length === 0) return '프리뷰 이미지가 업로드 되지 않았어요.';
    return validateCommonFields();
  };

  const validateEditInputs = () => {
    if (isAdmin) {
      if (isEmpty(projectName)) return '프로젝트명이 입력되지 않았어요.';
      if (isEmpty(teamName)) return '팀명이 입력되지 않았어요.';
      if (isEmpty(leaderName)) return '팀장명이 입력되지 않았어요.';
      if (contestId !== 1 && isEmpty(overview)) return '프로젝트 소개글이 작성되지 않았어요.';
    }

    if (isLeaderOfThisTeam) {
      if (!thumbnail && !previews.length) return '썸네일과 프리뷰 이미지가 모두 업로드되지 않았어요.';
      if (!thumbnail) return '썸네일이 업로드 되지 않았어요.';
      if (previews.length === 0) return '프리뷰 이미지가 업로드 되지 않았어요.';
      if (isEmpty(githubUrl)) return '깃허브 링크가 입력되지 않았어요.';
      if (isEmpty(youtubeUrl)) return '유튜브 링크가 입력되지 않았어요.';
      if (isEmpty(overview)) return '프로젝트 소개글이 작성되지 않았어요.';
    }

    return validateCommonFields();
  };

  const validateInputs = () => {
    if (isCreateMode) return validateCreateInputs();
    if (isEditMode) return validateEditInputs();
    return null;
  };

  const handleEdit = async () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      toast(errorMessage, 'error');
      return;
    }

    try {
      await patchProjectDetails(teamId!, {
        contestId: isAdmin ? (contestId !== null ? contestId : projectData!.contestId) : projectData!.contestId,
        teamName: isAdmin ? teamName : projectData!.teamName,
        projectName: isAdmin ? projectName : projectData!.projectName,
        leaderName: isAdmin ? leaderName : projectData!.leaderName,
        overview,
        productionPath: productionUrl,
        githubPath: githubUrl,
        youTubePath: youtubeUrl,
      });

      const addedMembers = teamMembers.filter(
        (member) => !projectData!.teamMembers.some((existing) => existing.teamMemberId === member.teamMemberId),
      );
      const removedMembers = projectData!.teamMembers.filter(
        (member) => !teamMembers.some((current) => current.teamMemberId === member.teamMemberId),
      );

      const removeMemberPromises = removedMembers.map(async (member) => {
        return await deleteMember(teamId!, member.teamMemberId);
      });
      await Promise.all(removeMemberPromises);

      const addMemberPromises = addedMembers.map(async (member) => {
        return await postMember(teamId!, { teamMemberName: member.teamMemberName });
      });
      await Promise.all(addMemberPromises);

      if (thumbnailToDelete) {
        await deleteThumbnail(teamId!);
      }
      if (thumbnail instanceof File) {
        const formData = new FormData();
        formData.append('image', thumbnail);
        await postThumbnail(teamId!, formData);
      }

      if (previewsToDelete.length > 0) {
        await deletePreview(teamId!, { imageIds: previewsToDelete });
      }
      const newFiles = previews.filter((p) => p.url instanceof File).map((p) => p.url as File);
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => formData.append('images', file));
        await postPreview(teamId!, formData);
      }
      queryClient.invalidateQueries({ queryKey: ['projectEditorInfo', teamId] });
      queryClient.invalidateQueries({ queryKey: ['thumbnail', teamId] });
      queryClient.invalidateQueries({ queryKey: ['previewImages', teamId] });
      queryClient.invalidateQueries({ queryKey: ['projectDetails', teamId] });
      toast('저장이 완료되었습니다.', 'success');
      (isLeaderOfThisTeam || isAdmin) && navigate(`/teams/view/${teamId}`);
    } catch (err: any) {
      toast(err?.response?.data?.message || '저장 중 오류가 발생했습니다.', 'error');
    }
  };

  const handleCreate = async () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      toast(errorMessage, 'error');
      return;
    }

    try {
      const response = await createProjectDetails({
        contestId: contestId!,
        projectName,
        teamName,
        leaderName,
        githubPath: githubUrl,
        youTubePath: youtubeUrl,
        productionPath: productionUrl,
        overview,
      });

      const createdTeamId = response.teamId;
      queryClient.invalidateQueries({ queryKey: ['projectDetails'] });
      toast('기본 정보 등록에 성공했어요');

      const postDetailTasks: Promise<any>[] = [];

      const addMemberPromises = teamMembers.map((member) =>
        postMember(createdTeamId, { teamMemberName: member.teamMemberName }),
      );
      postDetailTasks.push(...addMemberPromises);

      if (thumbnail instanceof File) {
        const formData = new FormData();
        formData.append('image', thumbnail);
        postDetailTasks.push(postThumbnail(createdTeamId, formData));
      }

      const newFiles = previews.filter((p) => p.url instanceof File).map((p) => p.url as File);
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => formData.append('images', file));
        postDetailTasks.push(postPreview(createdTeamId, formData));
      }

      await Promise.all(postDetailTasks);

      toast('세부 정보 등록이 완료되었습니다', 'success');
      setTimeout(() => navigate(`/teams/view/${createdTeamId}`), 300);

      queryClient.invalidateQueries({ queryKey: ['contests'] });
      queryClient.invalidateQueries({ queryKey: ['projectEditorInfo', teamId] });
      queryClient.invalidateQueries({ queryKey: ['projectDetails', createdTeamId] });
      queryClient.invalidateQueries({ queryKey: ['thumbnail', createdTeamId] });
      queryClient.invalidateQueries({ queryKey: ['previewImages', createdTeamId] });
    } catch (err: any) {
      toast(err?.response?.data?.message || '생성 도중 실패했어요', 'error');
      setTimeout(() => navigate(`/admin/contest`), 300);
    }
  };

  const onMemberAdd = (newMemberName: string) => {
    const trimmedName = newMemberName.trim();
    if (!trimmedName) {
      toast('팀원 이름을 입력해주세요.', 'info');
      return;
    }

    const isDuplicate = teamMembersRef.current.some(
      (member) => member.teamMemberName.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (isDuplicate) {
      toast(`팀원 "${trimmedName}" 은(는) 이미 존재해요`, 'info');
      return;
    }

    const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 1000);

    const newMember = {
      teamMemberId: generateUniqueId(),
      teamMemberName: trimmedName,
    };

    setTeamMembers((prev) => [...prev, newMember]);
    toast(`팀원 "${trimmedName}"을(를) 추가했어요`, 'success');
  };

  const onMemberRemove = (teamMemberId: number) => {
    const memberToRemove = teamMembersRef.current.find((m) => m.teamMemberId === teamMemberId);
    if (!memberToRemove) {
      toast('삭제할 팀원을 찾을 수 없어요', 'info');
      return;
    }

    const memberName =
      typeof memberToRemove.teamMemberName === 'string' && memberToRemove.teamMemberName.trim() !== ''
        ? memberToRemove.teamMemberName
        : '알 수 없는 팀원';

    setTeamMembers((prev) => prev.filter((m) => m.teamMemberId !== teamMemberId));
    toast(`팀원 "${memberName}"을(를) 삭제했어요`, 'info');
  };

  const handleSave = () => {
    if (isCreateMode) {
      handleCreate();
    }
    if (isEditMode) {
      handleEdit();
    }
  };

  return (
    <div className="px-5">
      <div className="text-title font-bold">{isEditMode ? '프로젝트 수정' : '프로젝트 생성'}</div>
      <div className="h-10" />
      {isAdmin && contestId !== 1 && (
        <>
          <AdminEditSection
            contestId={contestId}
            setContestId={setContestId}
            projectName={projectName}
            setProjectName={setProjectName}
            teamName={teamName}
            setTeamName={setTeamName}
            leaderName={leaderName}
            setLeaderName={setLeaderName}
          />
          <div className="h-15" />
          <MembersInput teamMembers={teamMembers} onMemberAdd={onMemberAdd} onMemberRemove={onMemberRemove} />
        </>
      )}

      {(isLeaderOfThisTeam || (isAdmin && contestId === 1)) && (
        <IntroSection
          projectName={projectName}
          teamName={teamName}
          leaderName={leaderName}
          teamMembers={teamMembers} // WARN: 백엔드 측에서 필드명 바꿀 수도 있음 주의
        />
      )}

      <div className="h-15" />

      <UrlInput
        productionUrl={productionUrl}
        setProductionUrl={setProductionUrl}
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
