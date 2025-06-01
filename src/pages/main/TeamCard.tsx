
import { FaHeart } from "react-icons/fa";
import {useState} from "react";

/*
* 썸네일과 좋아요는 null or defined 예외 처리
* Todo : 초기값이 null 인지 undefined 인지에 따라서 interface 수정하기
* */
interface OneCardProps {
    thumbnail? : string;
    title : string;
    teamName : string;
    isLiked?: boolean;
}

const TeamCard = ({thumbnail, title, teamName, isLiked = false}: OneCardProps) => {
    const [imageError, setImageError] = useState(false);

    const showImage = thumbnail && !imageError;

    return (
      <section
        aria-labelledby="teamCard"
        className="w-full max-w-[250px] max-h-[250px] aspect-[5/6] min-w-0 overflow-hidden rounded-xl border border-gray-200 shadow-sm"
      >
        {showImage ? (
          <div className="w-full aspect-[5/3]">
            <img src={thumbnail}
                 alt="썸네일"
                 className="w-full h-full object-cover"
                 onError={() => setImageError(true)}/>
          </div>
        ) : (
          <div className="w-full aspect-[5/3] flex items-center justify-center bg-lightGray text-midGray text-sm">썸네일</div>
        )}

        <div className="relative p-4 flex-grow flex flex-col justify-between">
          <div className="text-sm font-semibold text-black">{title}</div>
          <div className="text-base text-midGray">{teamName}</div>

          <div className="absolute right-4 bottom-4 text-gray-300">
            {isLiked ? <FaHeart color="red" size={24}/> : <FaHeart color="lightGray" size={24}/>}
          </div>
        </div>
      </section>
    );
};

export default TeamCard;