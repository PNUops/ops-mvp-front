import like from "@assets/like.svg"
import nolike from "@assets/nolike.svg"

/*
* 썸네일과 좋아요는 null 예외 처리
* */
interface OneCardProps {
    thumbnail? : string;
    title : string;
    teamName : string;
    isLiked?: boolean;
};

const TeamCard = ({thumbnail, title, teamName, isLiked = false}: OneCardProps) => {
return (
  <section
    aria-labelledby="teamCard"
    className="w-full max-w-[250px] max-h-[250px] aspect-[5/6] min-w-0 overflow-hidden rounded-xl border border-gray-200 shadow-sm"
  >
    {thumbnail ? (
      <div className="w-full aspect-[5/3]">
        <img src={thumbnail} alt="썸네일" className="w-full h-full object-cover" />
      </div>
    ) : (
      <div className="w-full aspect-[5/3] flex items-center justify-center bg-lightGray text-middleGray text-sm">썸네일</div>
    )}

    <div className="relative p-4 flex-grow flex flex-col justify-between">
      <div className="text-sm font-semibold text-black">{title}</div>
      <div className="text-base text-gray-500">{teamName}</div>

      <div className="absolute right-4 bottom-4 text-gray-300">
        {isLiked ? <img src={like} alt="좋아요 투표" /> : <img src={nolike} alt="좋아요 투표 안함" />}
      </div>
    </div>
  </section>
);
};

export default TeamCard;