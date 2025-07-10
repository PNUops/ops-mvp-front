import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from 'hooks/useToast';
import { isValidGithubUrl, isValidYoutubeUrl, isValidProjectUrl } from '@pages/project-editor/urlValidators';

import { createProjectDetails } from 'apis/projectEditor';

import AdminEditSection from '@pages/project-editor/AdminEditSection/AdminEditSection';
import UrlInput from '@pages/project-editor/UrlInput';
import OverviewInput from '@pages/project-editor/OverviewInput';

interface ProjectBasicFormProps {
  initialContestId: number;
  onSuccess: (createdId: number) => void;
}

const ProjectBasicForm = ({ initialContestId, onSuccess }: ProjectBasicFormProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [contestId, setContestId] = useState(initialContestId);
  const [projectName, setProjectName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [productionUrl, setProductionUrl] = useState<string | null>(null);
  const [overview, setOverview] = useState('');

  const handleSave = async () => {
    const validateBasicInputs = () => {
      if (!projectName) return '프로젝트명이 입력되지 않았어요.';
      if (!teamName) return '팀명이 입력되지 않았어요.';
      if (!leaderName) return '팀장명이 입력되지 않았어요.';
      if (!githubUrl) return '깃허브 링크가 입력되지 않았어요.';
      if (!youtubeUrl) return '유튜브 링크가 입력되지 않았어요.';
      if (!overview) return '프로젝트 소개글이 작성되지 않았어요.';
      if (productionUrl && !isValidProjectUrl(productionUrl)) return '유효한 프로젝트 주소를 입력하세요.';
      if (!isValidGithubUrl(githubUrl)) return '유효한 깃헙 URL을 입력하세요.';
      if (!isValidYoutubeUrl(youtubeUrl)) return '유효한 유튜브 URL을 입력하세요.';
      return null;
    };

    const errorMessage = validateBasicInputs();
    if (errorMessage) {
      toast(errorMessage, 'error');
      return;
    }

    try {
      const response = await createProjectDetails({
        contestId: contestId,
        projectName: projectName,
        teamName: teamName,
        leaderName: leaderName,
        githubPath: githubUrl,
        youTubePath: youtubeUrl,
        productionPath: productionUrl,
        overview: overview,
      });
      const createdTeamId = response.teamId;
      onSuccess(createdTeamId);
      setIsSubmitted(true);
      toast('기본 정보 등록이 완료되었습니다', 'success');
      queryClient.invalidateQueries({ queryKey: ['projectDetails'] });
    } catch (err: any) {
      toast(err?.response?.data?.message || '기본 정보 등록 중 오류가 발생했어요', 'error');
    }
  };

  return (
    <>
      <fieldset disabled={isSubmitted}>
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
        <div className="h-10" />
        <UrlInput
          prodUrl={productionUrl}
          setProdUrl={setProductionUrl}
          githubUrl={githubUrl}
          setGithubUrl={setGithubUrl}
          youtubeUrl={youtubeUrl}
          setYoutubeUrl={setYoutubeUrl}
        />
        <div className="h-10" />
        <OverviewInput overview={overview} setOverview={setOverview} />
      </fieldset>

      {!isSubmitted && (
        <>
          <div className="h-10" />
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
              등록
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectBasicForm;
