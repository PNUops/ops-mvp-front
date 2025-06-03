
import { FaHeart } from "react-icons/fa";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import apiClient from "../../apis/apiClient";

interface TeamCardProps {
    teamId : number;
    teamName : string;
    projectName : string;
    liked : boolean;
}


const TeamCard = ({teamId, teamName, projectName, liked} : TeamCardProps) => {
    const [imageError, setImageError] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(undefined);



    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await apiClient.get(`/teams/${teamId}/image/thumbnail`, {
                    responseType: "blob",
                });
                const imageUrl = URL.createObjectURL(res.data);
                setThumbnailUrl(imageUrl);
            } catch (err) {
                console.error("썸네일 로딩 실패", err);
                setImageError(true);
            }
        };
        fetchImage();
    }, [teamId]);



    return (
      <Link to={`/teams/view/${teamId}`}
        className="cursor-pointer transition-transform duration-200 hover:shadow-lg hover:scale-[1.02] w-full max-w-[250px] max-h-[250px] aspect-[5/6] min-w-0 overflow-hidden rounded-xl border border-gray-200 shadow-sm"
      >
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
            {liked ? <FaHeart color="red" size={24}/> : <FaHeart color="lightGray" size={24}/>}
          </div>
        </div>
      </Link>
    );
};

export default TeamCard;