import TeamCard from "@pages/main/TeamCard";
import LeaderMessage from "@pages/main/LeaderMessage";
import useAuth from "../../hooks/useAuth";
import {useQuery} from "@tanstack/react-query"
import {getAllTeams, getSubmissionStatus} from "../../apis/teams";
import {TeamListItemResponseDto} from "../../types/DTO/teams/teamListDto";
import LeaderSection from "@pages/main/LeaderSection";


const TotalCards = () => {

    const {
        data: teams,
    } = useQuery<TeamListItemResponseDto[]>({
        queryKey: ['teams'],
        queryFn: getAllTeams,
    });

    return (
      <div id="projects" className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-4">
            <h3 id="projects" className="text-sm font-bold">현재 투표진행중인 작품</h3>
            <LeaderSection />
      </div>

        <section
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