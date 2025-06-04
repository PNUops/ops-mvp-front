
import { FaHeart } from "react-icons/fa";
import { useState} from "react";
import {Link} from "react-router-dom";

interface TeamCardProps {
    teamId : number;
    teamName : string;
    projectName : string;
    isLiked : boolean;
}


const TeamCard = ({teamId, teamName, projectName, isLiked} : TeamCardProps) => {
    const [imageError, setImageError] = useState(false);

    const thumbnailUrl = `${import.meta.env.VITE_API_BASE_URL}/api/teams/${teamId}/image/thumbnail`;


    return (
      <Link to={`/teams/view/${teamId}`}
        className="cursor-pointer transition-transform duration-200 hover:shadow-lg hover:scale-[1.02] w-full max-w-[250px] max-h-[250px] aspect-[5/6] min-w-0 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        {!imageError ? (
          <div className="w-full aspect-[5/3]">
            <img src={thumbnailUrl}
                 alt="썸네일"
                 className="w-full h-full object-cover"
                 onError={() => setImageError(true)}/>
          </div>
        ) : (
          <div className="w-full aspect-[5/3] flex items-center justify-center bg-lightGray text-midGray text-sm">썸네일</div>
        )}

        <div className="relative p-4 flex-grow flex flex-col justify-between">
          <div className="text-sm font-semibold text-black">{projectName}</div>
          <div className="text-base text-midGray">{teamName}</div>

          <div className="absolute right-4 bottom-4 text-gray-300">
            {isLiked ? <FaHeart color="red" size={24}/> : <FaHeart color="lightGray" size={24}/>}
          </div>
        </div>
      </Link>
    );
};

export default TeamCard;