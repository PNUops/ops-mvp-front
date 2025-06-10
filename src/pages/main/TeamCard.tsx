import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface TeamCardProps {
  teamId: number;
  teamName: string;
  projectName: string;
  isLiked: boolean;
}

const TeamCard = ({ teamId, teamName, projectName, isLiked }: TeamCardProps) => {
  const [imageError, setImageError] = useState(false);

  const thumbnailUrl = `${import.meta.env.VITE_API_BASE_URL}/api/teams/${teamId}/image/thumbnail`;

  return (
    <Link
      to={`/teams/view/${teamId}`}
      className="border-lightGray flex aspect-[5/6] w-full cursor-pointer flex-col overflow-hidden rounded-xl border-[0.2px] transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
      style={{
        boxShadow: '4px 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      {!imageError ? (
        <div className="aspect-[3/2] object-cover">
          <img
            src={thumbnailUrl}
            alt="썸네일"
            className="h-full w-full object-cover object-center"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="bg-lightGray flex aspect-[3/2] w-full items-center justify-center">
          <div className="text-midGray flex h-full w-full items-center justify-center text-sm">썸네일</div>
        </div>
      )}

      <div className="p-3">
        <div className="text-[clamp(1rem,1.5vw,1.5rem)] font-semibold text-black">{projectName}</div>
        <div className="text-midGray text-base text-[clamp(1rem,1.4vw,1.4rem)]">{teamName}</div>
        <div className="flex justify-end">
          {isLiked ? (
            <FaHeart color="red" size="clamp(1.5rem, 2vw, 2rem)" />
          ) : (
            <FaHeart color="lightGray" size="clamp(1.5rem, 2vw, 2rem)" />
          )}
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
