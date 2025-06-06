
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
      <Link
        to={`/teams/view/${teamId}`}
        className="border-lightGray flex aspect-[5/6] w-full cursor-pointer flex-col overflow-hidden rounded-xl border shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
      >
        {!imageError ? (
          <div className="w-full aspect-[3/2] overflow-hidden">
            <img
              src={thumbnailUrl}
              alt="썸네일"
              className="h-full w-full object-cover object-center"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="bg-lightGray flex aspect-[3/2] w-full items-center justify-center">
            <div className="flex h-full items-center justify-center text-sm text-midGray">썸네일</div>
          </div>
        )}

        <div className="relative p-4">
          <div className="text-[clamp(1rem,1.2vw,1.2rem)] font-semibold text-black">{projectName}</div>

          <div className="text-[clamp(1rem,1.2vw,1.2rem)] text-midGray text-base">{teamName}</div>

          <div className="flex justify-end">
            {isLiked ? (
              <FaHeart color="red" size="clamp(0.6rem, 2vw, 1.8rem)" />
            ) : (
              <FaHeart color="lightGray" size="clamp(0.6rem, 2vw, 1.8rem)" />
            )}
          </div>
        </div>
      </Link>
    );
};

export default TeamCard;