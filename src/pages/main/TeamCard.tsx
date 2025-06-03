
import { FaHeart } from "react-icons/fa";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import apiClient from "../../apis/apiClient";

interface TeamInfo {
    thumbnail?: string;
    title: string;
    teamName: string;
    isLiked: boolean;
}

const TeamCard = ({teamId}: {teamId:number}) => {
    const [team, setTeam] = useState<TeamInfo | null>(null);
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeam = async() => {
            try {
                const res = await apiClient.get(`/teams/${teamId}`);
                setTeam(res.data);
            } catch (e) {
                console.error("팀 정보 가져오기 실패", e);
            }
        };
        fetchTeam();
    }, [teamId]);


    if (!team) return null;
    const showImage = team?.thumbnail && !imageError;

    return (
      <Link to={`/teams/${teamId}`}
        className="cursor-pointer transition-transform duration-200 hover:shadow-lg hover:scale-[1.02] w-full max-w-[250px] max-h-[250px] aspect-[5/6] min-w-0 overflow-hidden rounded-xl border border-gray-200 shadow-sm"
      >
        {showImage ? (
          <div className="w-full aspect-[5/3]">
            <img src={team.thumbnail}
                 alt="썸네일"
                 className="w-full h-full object-cover"
                 onError={() => setImageError(true)}/>
          </div>
        ) : (
          <div className="w-full aspect-[5/3] flex items-center justify-center bg-lightGray text-midGray text-sm">썸네일</div>
        )}

        <div className="relative p-4 flex-grow flex flex-col justify-between">
          <div className="text-sm font-semibold text-black">{team.title}</div>
          <div className="text-base text-midGray">{team.teamName}</div>

          <div className="absolute right-4 bottom-4 text-gray-300">
            {team.isLiked ? <FaHeart color="red" size={24}/> : <FaHeart color="lightGray" size={24}/>}
          </div>
        </div>
      </Link>
    );
};

export default TeamCard;