import {mockTeamDetail} from "@mocks/data/teams";
import TeamCard from "@pages/main/TeamCard";
import LeaderMessage from "@pages/main/LeaderMessage";
import {project_view} from "@mocks/data/viewer";

const TotalCards = () => {
    return (
        <div id="projects" className="flex flex-col gap-4">
            <h3 id="projects" className="text-sm font-bold">현재 투표진행중인 작품</h3>
            <LeaderMessage leaderName={"수아"} />
            <section aria-labelledby="allCards"
                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl px-4 mx-0">
                <TeamCard
                    title = "하이요"
                    teamName= "방가방가"/>
                <TeamCard
                    title = "안녕"
                    teamName= "방가요"
                    isLiked={true}/>
                <TeamCard
                    title = {project_view.projectName}
                    teamName= {project_view.teamName}
                    isLiked={project_view.isLiked}/>
                <TeamCard
                    title = "하이요"
                    teamName= "방가방가"/>
                <TeamCard
                    title = "하이요"
                    teamName= "방가방가"/>
                <TeamCard
                    title = "하이요"
                    teamName= "방가방가"/>
                <TeamCard
                    title = "하이요"
                    teamName= "방가방가"/>
                <TeamCard
                    title = "하이요"
                    teamName= "방가방가"/>
                <TeamCard
                    title = "하이요"
                    teamName= "방가방가"/>

            </section>

        </div>
    )

};

export default TotalCards;