import {mockTeamsMain} from "@mocks/data/teams";
import TeamCard from "@pages/main/TeamCard";
import LeaderMessage from "@pages/main/LeaderMessage";
import {mockSignInResponse} from "@mocks/data/sign-in";
import {useEffect, useState} from "react";
import {fetchAllTeams} from "../../apis/main";
import {team_thumbnail} from "@mocks/data/viewer";

const TotalCards = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        fetchAllTeams().then(setTeams).catch(console.error);
    }, []);

    return (
        <div id="projects" className="flex flex-col gap-4">
            <h3 id="projects" className="text-sm font-bold">현재 투표진행중인 작품</h3>
            <LeaderMessage leaderName={mockSignInResponse.name} />
            <section aria-labelledby="allCards"
                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl px-4 mx-0">
                {mockTeamsMain.map((team) => {
                    return(
                        <TeamCard
                            key={team.teamId}
                            title={team.projectName}
                            teamName={team.teamName}
                            isLiked={team.isLiked}
                            //thumbnail={`${import.meta.env.VITE_API_URL}/teams/${team.teamId}/thumbnail`}
                            // Todo: 실제 api 연동할 때는 위 코드로
                            thumbnail={team.thumbnail}
                        />
                    )

                })}

            </section>

        </div>
    )

};

export default TotalCards;