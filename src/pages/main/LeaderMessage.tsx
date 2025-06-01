import { BiError } from "react-icons/bi";
// TODO: lucide-react 써서 말풍선 모양 구현하기

interface LeaderProps {
    leaderName : string;
}

const LeaderMessage = ({ leaderName } : LeaderProps) => {
    console.log("👀 LeaderMessage 렌더링됨");
    return(
        <div className="relative ml-2 rounded-lg px-4 py-2 text-base text-mainGreen shadow-sm border border-green-200">
            <span className="flex items-center gap-1">
                <BiError color="#00A651"/>
                <strong className="font-bold">{leaderName}</strong> 팀장님, 에디터에서 프로젝트 정보를 작성해주세요!
            </span>

        </div>
    );
};

export default LeaderMessage;