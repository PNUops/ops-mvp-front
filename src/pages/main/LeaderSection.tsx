
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

    if (!showLeaderMessage) return null;

    return (
        <div className="absolute top-[150px] left-[280px] z-50">
            <div className="relative bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-6 w-fit">
                <div className="absolute -bottom-4 left-6 w-6 h-10 bg-white rotate-60 shadow-[3px_3px_6px_rgba(0,0,0,0.05)] z-0"/>

                <LeaderMessage leaderName={user?.name ?? '팀장'}/>

                <Link
                    to={`/teams/edit/${submissionData?.teamId}`}
                    className="mt-4 px-7 py-3 w-fit border border-midGray rounded-full text-sm font-medium flex items-center gap-2 mx-auto hover:bg-gray-50 transition">

                    <TbPencil size={20} strokeWidth={2}/>
                    프로젝트 에디터
                </Link>
            </div>
        </div>

    )
}


export default LeaderSection;