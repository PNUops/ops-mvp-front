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
    <section aria-labelledby="oneCard"
             className="w-[250px] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        {thumbnail ? (
            <img src={thumbnail} alt="썸네일" className="h-[120px] w-full bg-gray-200 object-cover"/>
        ) : (
            <div
                className="items-center flex h-[120px] w-full justify-center bg-gray-200 text-sm text-gray-500">썸네일</div>
        )}

        <div className="relative bg-white p-4">
            <div className="text-sm font-semibold text-black">{title}</div>
            <div className="text-base text-gray-500">{teamName}</div>

            <div className="absolute right-4 bottom-4 text-gray-300">
                {isLiked ? <img src={like} alt="좋아요 투표"/> : <img src={nolike} alt="좋아요 투표 안함"/>}
            </div>
        </div>
    </section>

);
};

export default TeamCard;