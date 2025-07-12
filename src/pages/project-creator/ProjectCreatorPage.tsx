import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';
import { useContestId } from 'hooks/useId';
import { useToast } from 'hooks/useToast';

import ProjectBasicForm from './ProjectBasicForm';
import ProjectDetailForm from './ProjectDetailForm';

const ProjectCreatorPage = () => {
  const isAdmin = useAuth();
  const initialContestId = useContestId();
  const [teamId, setTeamId] = useState<number | null>(null);

  if (!initialContestId) return <div>선택된 대회가 없습니다.</div>;
  if (!isAdmin) return <div>접근 권한이 없습니다.</div>;
  if (!initialContestId) return <div>생성할 프로젝트 소속을 찾을 수 없습니다.</div>;

  return (
    <div className="px-5">
      <div className="text-title font-bold">프로젝트 생성</div>
      <div className="h-10" />
      <ProjectBasicForm initialContestId={initialContestId} onSuccess={(createdId) => setTeamId(createdId)} />
      <div className="h-15" />
      <ProjectDetailForm teamId={teamId} />
    </div>
  );
};

export default ProjectCreatorPage;
