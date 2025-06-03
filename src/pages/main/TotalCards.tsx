import TeamCard from "@pages/main/TeamCard";
import LeaderMessage from "@pages/main/LeaderMessage";
import useAuth from "../../hooks/useAuth";
import {useQuery} from "@tanstack/react-query"
import {getAllTeams, getSubmissionStatus} from "../../apis/teams";
import {TeamListItemDto} from "../../types/DTO/teamListDto";
import {SubmissionStatusDto} from "../../types/DTO/submissionStatusDto";
import {Link} from "react-router-dom";
import { TbPencil } from "react-icons/tb";


const TotalCards = () => {

    const { isLeader, user } = useAuth();
    const {
        data: submissionData,
    } = useQuery<SubmissionStatusDto>({
        queryKey: ['submissionStatus'],
        queryFn: getSubmissionStatus,
        enabled: isLeader,
    });

    const {
        data: teams,
    } = useQuery<TeamListItemDto[]>({
        queryKey: ['teams'],
        queryFn: getAllTeams,
    });

    const showLeaderMessage = isLeader && submissionData?.isSubmitted === false;

    return (
      <div id="projects" className="flex flex-col gap-4">
        {isLeader && submissionData?.teamId && (
          <div className="flex justify-between items-center px-4">
            <h3 id="projects" className="text-sm font-bold">현재 투표진행중인 작품</h3>
            <Link
              to={`/teams/edit/${submissionData.teamId}`}
              className="flex items-center gap-2 bg-mainGreen text-white font-inter font-bold text-[18px] leading-[100%] rounded-full px-5 py-3"
            >
              <TbPencil size={16} strokeWidth={2} />
              프로젝트 에디터
            </Link>
          </div>
        )}

        {showLeaderMessage && <LeaderMessage leaderName={user?.name ?? '팀장'} />}

        <section
          aria-labelledby="allCards"
          className="mx-0 grid max-w-screen-xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {teams?.map((team) => (
            <TeamCard
              key={team.teamId}
              teamId={team.teamId}
              teamName={team.teamName}
              projectName={team.projectName}
              liked={team.liked}
            />
          ))}
        </section>
      </div>
    );

};

export default TotalCards;