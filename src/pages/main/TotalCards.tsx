import TeamCard from "@pages/main/TeamCard";
import LeaderMessage from "@pages/main/LeaderMessage";
import useAuth from "../../hooks/useAuth";
import {useQuery} from "@tanstack/react-query"
import {getAllTeams, getSubmissionStatus} from "../../apis/teams";
import {TeamListItemDto} from "../../types/DTO/teamListDto";
import {SubmissionStatusDto} from "../../types/DTO/submissionStatusDto";


const TotalCards = () => {

    const {isLeader, user} = useAuth();

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


    console.log("isLeader", isLeader);
    console.log("teams", teams);
    console.log("submissionData", submissionData);

    const showLeaderMessage = isLeader && submissionData?.isSubmitted === false;

    return (
        <div id="projects" className="flex flex-col gap-4">
            <h3 id="projects" className="text-sm font-bold">현재 투표진행중인 작품</h3>


            {showLeaderMessage && <LeaderMessage leaderName={user?.name ?? "팀장" } />}

            <section aria-labelledby="allCards"
                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl px-4 mx-0">
                {teams?.map((team) => (
                    <TeamCard
                        key={team.teamId}
                        teamId={team.teamId}
                        teamName={team.teamName}
                        projectName={team.projectName}
                        liked={team.liked}/>
                ))}

            </section>

        </div>
    )

};

export default TotalCards;