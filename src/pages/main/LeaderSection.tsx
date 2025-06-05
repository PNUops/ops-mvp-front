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
        <div className="relative bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)] p-7 w-fit">
            <div className="absolute -bottom-9 left-10 w-10 h-20 bg-white rotate-63 shadow-[3px_3px_6px_rgba(0,0,0,0.1)] z-0"/>

            <LeaderMessage leaderName={user?.name ?? '팀장'}/>

            <Link
                to={`/teams/edit/${submissionData?.teamId}`}
                className="mt-4 px-8 py-4 w-fit border border-midGray rounded-full text-exsm flex items-center gap-2 mx-auto hover:bg-gray-50 transition">

                <TbPencil size={20} strokeWidth={2}/>
                프로젝트 에디터
            </Link>
        </div>


    )
}


export default LeaderSection;