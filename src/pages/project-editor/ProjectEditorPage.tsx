import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

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
  ThumbnailResult,
} from 'apis/projectEditor';

import {
  TeamMember,
  PreviewImagesResponseDto,
  ProjectDetailsResponseDto,
  PreviewResult,
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
  const [isSaved, setIsSaved] = useState(false);

  const [contestId, setContestId] = useState<number | null>(initialContestId ?? null);
  const [teamName, setTeamName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [thumbnail, setThumbnail] = useState<ThumbnailResult | File | undefined>();
  const [thumbnailToDelete, setThumbnailToDelete] = useState<boolean>(false);
  const [previews, setPreviews] = useState<(PreviewResult | File)[]>([]);
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
    queryKey: ['projectDetails', teamId],
    queryFn: async () => {
      if (teamId === null) throw new Error('teamId is null');
      return await getProjectDetails(teamId);
    },
    enabled: isEditMode && teamId !== null,
  });

  const { data: thumbnailResult } = useQuery<ThumbnailResult>({
    queryKey: ['thumbnail', teamId],
    queryFn: async () => {
      if (teamId === null) throw new Error('teamId is null');
      return await getThumbnail(teamId);
    },
    enabled: teamId !== null,
    refetchInterval: (query) => (query.state.data?.status === 'processing' ? 1500 : false),
  });

  const stablePreviewIds = useMemo(() => {
    return projectData?.previewIds ?? [];
  }, [projectData?.previewIds?.join(',')]);
  const { data: previewData } = useQuery<PreviewImagesResponseDto>({
    queryKey: ['previewImages', teamId, stablePreviewIds],
    queryFn: async () => {
      if (teamId === null || !projectData?.previewIds) throw new Error('previewIds 없음');
      return await getPreviewImages(teamId, projectData.previewIds);
    },
    enabled: teamId !== null && stablePreviewIds.length > 0,
    refetchInterval: (query) => {
      const data = query.state.data;
      const shouldRefetch = data?.imageResults?.every((result) => result.status === 'processing') ?? false;
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
    if (thumbnailResult) {
      setThumbnail(thumbnailResult);
    }
  }, [thumbnailResult]);

  useEffect(() => {
    if (previewData && previewData.imageResults) {
      setPreviews(previewData.imageResults);
    }
  }, [previewData]);

  useEffect(() => {
    teamMembersRef.current = teamMembers;
  }, [teamMembers]);

  useEffect(() => {
    return () => {
      if (
        thumbnail &&
        typeof thumbnail === 'object' &&
        'url' in thumbnail &&
        typeof thumbnail.url === 'string' &&
        thumbnail.url.startsWith('blob:')
      ) {
        URL.revokeObjectURL(thumbnail.url);
      }
      previews.forEach((p) => {
        if (typeof p === 'object' && 'url' in p && typeof p.url === 'string' && p.url.startsWith('blob:')) {
          URL.revokeObjectURL(p.url);
        }
      });
    };
  }, [thumbnail, previews]);

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
    if (isEmpty(projectName)) return '프로젝트명이 입력되지 않았어요';
    if (isEmpty(teamName)) return '팀명이 입력되지 않았어요';
    if (isEmpty(leaderName)) return '팀장명이 입력되지 않았어요';
    if (teamMembers.length < 1) return '팀원이 목록이 비어있어요';
    if (productionUrl && !isValidProjectUrl(productionUrl)) return '프로젝트 주소가 유효하지 않아요';
    if (isEmpty(githubUrl)) return 'GitHub 링크가 입력되지 않았어요';
    if (!isValidGithubUrl(githubUrl)) return 'GitHub URL이 유효하지 않아요';
    if (isEmpty(youtubeUrl)) return 'YouTube 링크가 입력되지 않았어요';
    if (!isValidYoutubeUrl(youtubeUrl)) return 'YouTube URL이 유효하지 않아요';
    if (isEmpty(overview)) return '프로젝트 소개글이 입력되지 않았어요';
  };

  const validateCreateInputs = () => {
    if (isAdmin) {
      if (contestId === null) return '대회 종류를 선택해야 해요';
    }
    return validateCommonFields();
  };

  const validateEditInputs = () => {
    if (isLeaderOfThisTeam) {
      if (!thumbnail || previews.length === 0) return '썸네일을 포함한 두 개 이상의 이미지를 올려주세요';
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
        setPreviewsToDelete([]);
      }
      const newFiles = previews.filter((p) => p instanceof File).map((p) => p as File);
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => formData.append('images', file));
        await postPreview(teamId!, formData);
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['contests'] }),
        queryClient.invalidateQueries({ queryKey: ['thumbnail', teamId] }),
        queryClient.invalidateQueries({ queryKey: ['previewImages', teamId, stablePreviewIds] }),
        queryClient.invalidateQueries({ queryKey: ['projectDetails', teamId] }),
      ]);

      toast('수정이 완료되었어요', 'success');
      navigate(`/teams/view/${teamId}`);
    } catch (err: any) {
      toast(err?.response?.data?.message || '저장 중 오류가 발생했어요', 'error');
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

      const newFiles = previews.filter((p) => p instanceof File).map((p) => p as File);
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => formData.append('images', file));
        postDetailTasks.push(postPreview(createdTeamId, formData));
      }

      await Promise.all(postDetailTasks);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['contests'] }),
        queryClient.invalidateQueries({ queryKey: ['thumbnail', teamId] }),
        queryClient.invalidateQueries({ queryKey: ['previewImages', teamId, stablePreviewIds] }),
        queryClient.invalidateQueries({ queryKey: ['projectDetails', teamId] }),
      ]);

      toast('생성이 완료되었어요', 'success');
      navigate(`/teams/view/${createdTeamId}`);
    } catch (err: any) {
      toast(err?.response?.data?.message || '생성 도중 실패했어요', 'error');
      navigate(`/admin/contest`);
    }
  };

  const onMemberAdd = (newMemberName: string) => {
    const trimmedName = newMemberName.trim();
    if (!trimmedName) {
      toast('팀원 이름이 입력되지 않았어요', 'info');
      return;
    }

    const isDuplicate = teamMembersRef.current.some(
      (member) =>
        member.teamMemberName.toLowerCase() === trimmedName.toLowerCase() ||
        leaderName.trim().toLowerCase() === trimmedName.toLowerCase(),
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

  const hasCreatorInputs = (): boolean => {
    return (
      !!contestId &&
      !isEmpty(projectName) &&
      !isEmpty(teamName) &&
      !isEmpty(leaderName) &&
      teamMembers.length > 0 &&
      !isEmpty(githubUrl) &&
      !isEmpty(youtubeUrl) &&
      !isEmpty(overview)
    );
  };

  const hasEditorChanges = (): boolean => {
    if (!projectData) return true;

    const basicInfoChanged =
      projectData.projectName !== projectName ||
      projectData.teamName !== teamName ||
      projectData.leaderName !== leaderName ||
      projectData.overview !== overview ||
      projectData.productionPath !== productionUrl ||
      projectData.githubPath !== githubUrl ||
      projectData.youTubePath !== youtubeUrl;

    const membersChanged =
      JSON.stringify(projectData.teamMembers.map((m) => m.teamMemberName).sort()) !==
      JSON.stringify(teamMembers.map((m) => m.teamMemberName).sort());

    const thumbnailChanged = thumbnailToDelete || thumbnail instanceof File;

    const previewAdded = previews.some((p) => p instanceof File);
    const previewDeleted = previewsToDelete.length > 0;

    return basicInfoChanged || membersChanged || thumbnailChanged || previewAdded || previewDeleted;
  };

  const handleSave = async () => {
    if (isSaved) return;

    setIsSaved(true);
    try {
      if (isCreateMode) {
        await handleCreate();
      } else if (isEditMode) {
        await handleEdit();
      }
    } finally {
      setIsSaved(false);
    }
  };

  return (
    <div className="min-w-xs px-2 sm:px-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div className="sm:text-title text-xl font-bold">{isEditMode ? '프로젝트 수정' : '프로젝트 생성'}</div>
        <p className="text-midGray text-exsm">
          {isEditMode ? (
            <>
              필수(<span className="text-rose-400">*</span>) 항목과 변경사항이 있어야 버튼이 켜져요.
            </>
          ) : (
            <>
              필수(<span className="text-rose-400">*</span>) 항목을 모두 작성하면 버튼이 켜져요.
            </>
          )}
        </p>
      </div>

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
        isAdmin={isAdmin}
      />

      <div className="h-15" />
      <OverviewInput overview={overview} setOverview={setOverview} />
      <div className="h-20" />
      <div className="flex flex-col-reverse items-end gap-5 sm:flex-row sm:justify-end sm:gap-10">
        <button
          onClick={() => navigate(-1)}
          className="border-mainGreen hover:bg-whiteGray focus:bg-subGreen text-mainGreen rounded-full border px-15 py-4 font-bold hover:cursor-pointer focus:outline-none"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          disabled={isSaved || !hasEditorChanges() || !hasCreatorInputs()}
          className={`${isSaved || !hasEditorChanges() || !hasCreatorInputs() ? 'bg-lightGray cursor-not-allowed' : 'bg-mainGreen cursor-pointer hover:bg-green-700 focus:bg-green-400'} rounded-full px-15 py-4 text-sm font-bold text-white transition-colors duration-300 ease-in-out focus:outline-none`}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default ProjectEditorPage;
