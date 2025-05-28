import {mockTeamDetail} from "@mocks/data/teams";
import OneCard from "@pages/main/OneCard";
import LeaderMessage from "@pages/main/LeaderMessage";

const TotalCard = () => {
    return (
        <div id="projects" className="flex flex-col gap-4">
            <h3 id="projects" className="text-sm font-bold">현재 투표진행중인 작품</h3>
            <LeaderMessage leaderName={"수아"} />
            <section aria-labelledby="allCards"
                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl px-4 mx-0">
                <OneCard
                    title = "하이요"
                    teamName= "방가방가"/>
                <OneCard
                    title = "안녕"
                    teamName= "방가요"
                    isLiked={true}/>
                <OneCard
                    title = {mockTeamDetail.name}
                    teamName= {mockTeamDetail.description}
                    isLiked={mockTeamDetail.isLiked}/>
                <OneCard
                    title = "하이요"
                    teamName= "방가방가"/>
                <OneCard
                    title = "하이요"
                    teamName= "방가방가"/>
                <OneCard
                    title = "하이요"
                    teamName= "방가방가"/>
                <OneCard
                    title = "하이요"
                    teamName= "방가방가"/>
                <OneCard
                    title = "하이요"
                    teamName= "방가방가"/>
                <OneCard
                    title = "하이요"
                    teamName= "방가방가"/>

            </section>

        </div>
    )

};

export default TotalCard;