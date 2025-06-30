import LeaderMessage from '@pages/main/LeaderMessage';
import useAuth from '../../hooks/useAuth';
import { getSubmissionStatus } from '../../apis/teams';
import { useQuery } from '@tanstack/react-query';
import { SubmissionStatusResponseDto } from '../../types/DTO/teams/submissionStatusDto';
import { Link } from 'react-router-dom';
import { TbPencil } from 'react-icons/tb';
import RoundedButton from '@components/RoundedButton';

const LeaderSection = () => {
  const { isLeader, user } = useAuth();
  const { data: submissionData } = useQuery<SubmissionStatusResponseDto>({
    queryKey: ['submissionStatus'],
    queryFn: getSubmissionStatus,
    enabled: isLeader,
  });

  const showLeaderMessage = isLeader && submissionData?.isSubmitted === false;

  // if (!showLeaderMessage) return null;
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-lg bg-white p-2 text-sm shadow-md sm:gap-4 sm:p-4">
      <LeaderMessage leaderName={user?.name ?? '팀장'} />
      <Link to={`/teams/edit/${submissionData?.teamId}`}>
        <RoundedButton className="flex items-center gap-1">
          <TbPencil className="text-xl" />
          <span className="hidden whitespace-nowrap md:inline">작성하러 가기</span>
        </RoundedButton>
      </Link>
    </div>
  );
};

export default LeaderSection;
