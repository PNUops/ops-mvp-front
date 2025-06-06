import { useParams } from 'react-router-dom';

export const useTeamId = (): number | null => {
  const { teamId } = useParams<{ teamId: string }>();
  const parsedTeamId = Number(teamId);
  return !teamId || isNaN(parsedTeamId) ? null : parsedTeamId;
};
