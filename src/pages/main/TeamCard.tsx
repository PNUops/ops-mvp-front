import { FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import basicThumbnail from '@assets/basicThumbnail.jpg';
import { getThumbnailTeams } from '../../apis/teams';

interface TeamCardProps {
  teamId: number;
  teamName: string;
  projectName: string;
  isLiked: boolean;
  isVoteTerm?: boolean;
}

const TeamCard = ({ teamId, teamName, projectName, isLiked, isVoteTerm }: TeamCardProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(basicThumbnail);

  useEffect(() => {
    const fetchThumbnail = async () => {
      const url = await getThumbnailTeams(teamId);
      if (url) {
        setThumbnailUrl(url);
      }
    };
    fetchThumbnail();
  }, [teamId]);

  return (
    <Link to={`/teams/view/${teamId}`} className="flex aspect-[7/8] w-full flex-col">
      <div className="border-lightGray relative aspect-[3/2] flex-shrink-0 cursor-pointer overflow-hidden rounded-md border transition-transform duration-200 hover:scale-[1.02] hover:shadow-md">
        <img src={thumbnailUrl ?? basicThumbnail} alt="썸네일" className="h-full w-full object-contain" />

        <div className="absolute top-3 right-3 z-10">
          {isVoteTerm && isLiked && <FaHeart color="red" size="clamp(1.5rem, 2vw, 1.8rem)" />}
        </div>
      </div>

      <div className="p-3">
        <div className="line-clamp-2 text-[clamp(0.85rem,2vw,1.3rem)] leading-tight font-semibold text-black">
          {projectName}
        </div>
        <div className="text-midGray truncate overflow-hidden py-2 text-[clamp(0.8rem,1.8vw,1rem)]">{teamName}</div>
      </div>
    </Link>
  );
};

export default TeamCard;
