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
    <div className="flex w-fit gap-4 rounded-lg bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
      <LeaderMessage leaderName={user?.name ?? '팀장'} />

      <Link to={`/teams/edit/${submissionData?.teamId}`}>
        <RoundedButton className="flex w-fit items-center gap-1">
          <TbPencil size={20} strokeWidth={2} />
          작성하러 가기
        </RoundedButton>
      </Link>
    </div>
  );
};

export default LeaderSection;
