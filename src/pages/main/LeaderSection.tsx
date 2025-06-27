import LeaderMessage from '@pages/main/LeaderMessage';
import useAuth from '../../hooks/useAuth';
import { getSubmissionStatus } from '../../apis/teams';
import { useQuery } from '@tanstack/react-query';
import { SubmissionStatusResponseDto } from '../../types/DTO/teams/submissionStatusDto';
import { Link } from 'react-router-dom';
import { TbPencil } from 'react-icons/tb';

const LeaderSection = () => {
  const { isLeader, user } = useAuth();
  const { data: submissionData } = useQuery<SubmissionStatusResponseDto>({
    queryKey: ['submissionStatus'],
    queryFn: getSubmissionStatus,
    enabled: isLeader,
  });



  const showLeaderMessage = isLeader && submissionData?.isSubmitted === false;

  if (!showLeaderMessage) return null;

  return (
    <div className="flex items-center justify-between gap-4 w-full lg:w-fit
                 overflow-hidden
                 rounded-lg bg-white p-4
                 shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                 text-sm">
      <LeaderMessage leaderName={user?.name ?? '팀장'} />

      <Link to={`/teams/edit/${submissionData?.teamId}`}>
        <button className="flex items-center justify-center
                          border border-lightGray hover:bg-mainGreen hover:text-white
                          rounded-full p-2
                          md:px-4 md:py-3 md:gap-2">
          <TbPencil size={30} />
          <span className="hidden md:inline whitespace-nowrap">
            작성하러 가기</span>
        </button>

      </Link>
    </div>
  );
};

export default LeaderSection;
