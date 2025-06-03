import TeamCard from "@pages/main/TeamCard";
import LeaderMessage from "@pages/main/LeaderMessage";
import {useEffect, useState} from "react";
import {mockSignInResponse} from "@mocks/data/sign-in";


const TotalCards = () => {
    useEffect(() => {


        const mockIsLeader = mockSignInResponse.memberType.includes("ROLE_팀장");
        const mockIsSubmitted = mockTeamLeaderMessage.isSubmitted;

        if (mockIsLeader && !mockIsSubmitted) {
        /*
        Todo : 실제 api 연동 시
        if (mockIsLeader) {
            fetchSubmissionStatus()
                .then(() => {
                    if (!mockTeamLeaderMessage.isSubmitted) {
                        setCondition(true);
                    }
                })
                .catch(console.error);
              */
           setCondition(true);

        }

        // fetchAllTeams().then(setTeams).catch(console.error);
    }, []);

    return (
        <div id="projects" className="flex flex-col gap-4">
            <h3 id="projects" className="text-sm font-bold">현재 투표진행중인 작품</h3>
            {isLeaderAndNotSubmitted && (
                <LeaderMessage leaderName={mockSignInResponse.name} />
            )}

            <section aria-labelledby="allCards"
                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl px-4 mx-0">
                {mockTeamsMain.map((team) => (
                    <TeamCard teamId={team.teamId}/>
                ))}

            </section>

        </div>
    )

};

export default TotalCards;