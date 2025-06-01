import {mockTeamsMain} from "@mocks/data/teams";
import TeamCard from "@pages/main/TeamCard";
import LeaderMessage from "@pages/main/LeaderMessage";
import {mockSignInResponse, mockTeamLeaderMessage} from "@mocks/data/sign-in";
import {useEffect, useState} from "react";
import {fetchAllTeams, fetchSubmissionStatus} from "../../apis/main";
import {useTokenStore} from "../../stores/useTokenStore";
import { decodeJwt } from "jose";


const TotalCards = () => {
    console.log("🎯 TotalCards 함수 시작됨");
    const [teams, setTeams] = useState([]);
    const [isLeaderAndNotSubmitted, setCondition] = useState(false);
    const token = useTokenStore((state)=> state.token);

    useEffect(() => {
        /*
        Todo : payload role == 팀장 확인 로직
        // if (!token) {
        //     console.log("토큰 없음");
        //     return;
        // }
        // const payload = decodeJwt(token);
        // const isLeader = payload?.role?.includes("ROLE_팀장");

        */

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
                    <TeamCard
                        key={team.teamId}
                        title={team.projectName}
                        teamName={team.teamName}
                        isLiked={team.isLiked}
                        //thumbnail={`${import.meta.env.VITE_API_URL}/teams/${team.teamId}/thumbnail`}
                        // Todo: 실제 api 연동할 때는 위 코드로
                        thumbnail={team.thumbnail}
                    />
                ))}

            </section>

        </div>
    )

};

export default TotalCards;