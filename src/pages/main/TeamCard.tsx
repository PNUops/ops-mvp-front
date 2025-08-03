import { FaHeart } from 'react-icons/fa';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import basicThumbnail from '@assets/basicThumbnail.jpg'
import {getThumbnailTeams} from "../../apis/teams";

interface TeamCardProps {
  teamId: number;
  teamName: string;
  projectName: string;
  isLiked: boolean;
}

const TeamCard = ({ teamId, teamName, projectName, isLiked }: TeamCardProps) => {
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
    <Link
      to={`/teams/view/${teamId}`}
      className="flex aspect-[7/8] w-full flex-col"

    >
      <div className="aspect-[3/2] flex-shrink-0 object-cover overflow-hidden relative rounded-md border border-lightGray cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:shadow-md">
          <img src={thumbnailUrl ?? basicThumbnail}
            alt="썸네일"
            className="w-full h-full object-cover"
          />

        <div className="absolute top-3 right-3 z-10">
          {isLiked && (
            <FaHeart color="red" size="clamp(1.5rem, 2vw, 1.8rem)" />
          )}
        </div>
      </div>

        <div className="p-3">
          <div
            className="font-semibold text-black text-[clamp(0.85rem,2vw,1.3rem)] leading-tight line-clamp-2">
            {projectName}
          </div>
          <div className="py-2 text-midGray text-[clamp(0.8rem,1.8vw,1rem)] truncate overflow-hidden">
            {teamName}
          </div>

        </div>
    </Link>
  );
};

export default TeamCard;
