import TeamCard from "@pages/main/TeamCard";
import {useQuery} from "@tanstack/react-query"
import {getAllTeams} from "../../apis/teams";
import {TeamListItemResponseDto} from "../../types/DTO/teams/teamListDto";
import LeaderSection from "@pages/main/LeaderSection";
import LoadingSpinner from "@pages/main/LoadingSpinner";
import { useRef } from "react";


const TotalCards = () => {
    const {
        data: teams,
        isLoading,
        isError,
    } = useQuery<TeamListItemResponseDto[]>({
        queryKey: ['teams'],
        queryFn: getAllTeams,
        staleTime: 1000 * 60 * 15,  // stale 시간: 15분
        gcTime: 1000 * 60 * 15,  // 캐시 삭제 기간 : 15분 간격
    });

    return (

        <div id="projects" className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-4">
                <h3 id="projects" className="text-sm md:text-md lg:text-xl font-bold">
                    현재 투표진행중인 작품</h3>
            </div>
            <div className="absolute z-50
              top-10 left-50
              sm:top-0 sm:left-55
              md:top-0 md:left-50
              lg:top-10 md:left-70
              xl:top-30 md:left-65
              ">
                <LeaderSection />
            </div>


            <section
                className="mx-0 grid max-w-screen-xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {isLoading && <LoadingSpinner />}
                {isError && <p>데이터를 불러오지 못했습니다.</p>}
                {teams?.map((team) => (
                    <TeamCard
                        key={team.teamId}
                        teamId={team.teamId}
                        teamName={team.teamName}
                        projectName={team.projectName}
                        isLiked={team.liked}
                    />
                ))}
            </section>
        </div>
    );

};

export default TotalCards;