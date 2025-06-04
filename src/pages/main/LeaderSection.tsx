
import LeaderMessage from "@pages/main/LeaderMessage";
import useAuth from "../../hooks/useAuth";
import {getSubmissionStatus} from "../../apis/teams";
import {useQuery} from "@tanstack/react-query";
import {SubmissionStatusResponseDto} from "../../types/DTO/teams/submissionStatusDto";
import {Link} from "react-router-dom";
import {TbPencil} from "react-icons/tb";

const LeaderSection = () => {
    const { isLeader, user } = useAuth();
    const {
        data: submissionData,
    } = useQuery<SubmissionStatusResponseDto>({
        queryKey: ['submissionStatus'],
        queryFn: getSubmissionStatus,
        enabled: isLeader,
    });

    const showLeaderMessage = isLeader && submissionData?.isSubmitted === false;

    if (!isLeader) return null;

    return (
        <>
            {submissionData?.teamId && (
            <Link
                to={`/teams/edit/${submissionData.teamId}`}
                className="flex items-center gap-2 bg-mainGreen text-white font-bold text-lg leading-[100%] rounded-full px-5 py-3">
                <TbPencil size={16} strokeWidth={2} />
                프로젝트 에디터
            </Link>
            )}
            {showLeaderMessage && (<LeaderMessage leaderName={user?.name ?? '팀장'} />)}
        </>

    )
}


export default LeaderSection;