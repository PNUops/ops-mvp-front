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
      className="border-lightGray flex aspect-[7/8] w-full cursor-pointer flex-col overflow-hidden rounded-xl border-[0.2px] transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
      style={{
        boxShadow: '4px 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <div className="aspect-[3/2] object-cover relative overflow-hidden">
        {!imageError ? (
          <img
            src={thumbnailUrl}
            alt="썸네일"
            className="object-cover object-center"
            onError={() => setImageError(true)}
          />
          ) : (
          <div className="bg-lightGray flex aspect-[3/2] w-full items-center justify-center">
          <div className="text-midGray flex h-full w-full items-center justify-center text-sm">썸네일</div>
          </div>
          )}

        <div className="absolute top-3 right-3 z-10">
          {isLiked && (
            <FaHeart color="red" size="clamp(1.5rem, 2vw, 1.8rem)" />
          )}
        </div>
      </div>

        <div className="p-3">
          <div
            className="font-semibold text-black text-[clamp(0.85rem,2.5vw,1.5rem)] break-keep overflow-hidden text-ellipsis">
            {projectName}
          </div>
          <div className="text-midGray text-[clamp(0.8rem,2vw,1rem)] truncate overflow-hidden">
            {teamName}
          </div>

        </div>
    </Link>
  );
};

export default TeamCard;
