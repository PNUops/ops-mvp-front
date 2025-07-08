import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';
import { useContestId } from 'hooks/useId';
import { useToast } from 'hooks/useToast';

import {
  getThumbnail,
  createProjectDetails,
  patchProjectDetails,
  postPreview,
  postThumbnail,
  deletePreview,
  deleteThumbnail,
  postMember,
  deleteMember,
} from 'apis/projectEditor';

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
  url: string | File;
}

const ProjectCreatorPage = () => {
  const isAdmin = useAuth();
  const contestIdFromParams = useContestId();
  const [contestId, setContestId] = useState<number | null>(null);
  const [teamName, setTeamName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [prodUrl, setProdUrl] = useState<string | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [overview, setOverview] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!contestIdFromParams) return <div>선택된 대회가 없습니다.</div>;

  if (!isAdmin) {
    return <div>접근 권한이 없습니다.</div>;
  }

  useEffect(() => {
    if (contestIdFromParams) {
      setContestId(contestIdFromParams);
    }
  }, [contestIdFromParams]);

  if (!contestId) return <div>생성할 프로젝트 소속을 찾을 수 없습니다.</div>;

  const handleSave = async () => {
    // const validateProjectInputs = () => {
    //   if (isAdmin) {
    //     if (!projectName) return '프로젝트명이 입력되지 않았어요.';
    //     if (!teamName) return '팀명이 입력되지 않았어요.';
    //     if (!leaderName) return '팀장명이 입력되지 않았어요.';
    //   }
    //   if (!githubUrl) return '깃허브 링크가 입력되지 않았어요.';
    //   if (!youtubeUrl) return '유튜브 링크가 입력되지 않았어요.';
    //   if (!overview) return '프로젝트 소개글이 작성되지 않았어요.';
    //   if (prodUrl && !isValidProjectUrl(prodUrl)) return '유효한 프로젝트 주소를 입력하세요.';
    //   if (!isValidGithubUrl(githubUrl)) return '유효한 깃헙 URL을 입력하세요.';
    //   if (!isValidYoutubeUrl(youtubeUrl)) return '유효한 유튜브 URL을 입력하세요.';
    //   return null;
    // };

    // const errorMessage = validateProjectInputs();
    // if (errorMessage) {
    //   toast(errorMessage, 'error');
    //   return;
    // }

    try {
      // await createProjectDetails({
      //   contestId: contestId,
      //   teamName: teamName,
      //   projectName: projectName,
      //   leaderName: leaderName,
      //   overview,
      //   productionPath: prodUrl,
      //   githubPath: githubUrl,
      //   youTubePath: youtubeUrl,
      // });
      const response = await createProjectDetails({
        contestId: contestId,
        teamName: '팀 이름',
        projectName: '프로젝트 이름',
        leaderName: '팀장 이름',
        overview: '프로젝트 소개글',
        productionPath: '',
        githubPath: 'https://github.com/2025-PNU-SW-Hackathon',
        youTubePath: 'https://youtu.be/CYoK_cuG8lU',
      });
      const createdTeamId = response.teamId;
      toast('저장이 완료되었습니다.', 'success');
      isAdmin && navigate(`/teams/edit/${createdTeamId}`);
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
      <div className="text-title font-bold">프로젝트 생성</div>
      <div className="h-10" />
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

export default ProjectCreatorPage;
