import { useQuery } from '@tanstack/react-query';

import { getProjectDetails } from 'apis/projectViewer';
import { ProjectDetailsResponseDto } from 'types/DTO/projectViewerDto';

const useProjectData = (teamId: number) => {
  const {
    data: projectData,
    isLoading: isProjectDataLoading,
    isError: isProjectDataError,
  } = useQuery<ProjectDetailsResponseDto>({
    queryKey: ['projectData', teamId],
    queryFn: async () => {
      if (teamId === null) throw new Error('teamId is null');
      return await getProjectDetails(teamId);
    },
    enabled: teamId !== null,
  });

  return {
    projectData,
    isProjectDataLoading,
    isProjectDataError,
  };
};

export default useProjectData;
