import { BiError } from "react-icons/bi";

type LeaderProps = {
    leaderName : string;
};

const LeaderMessage = ({ leaderName } : LeaderProps) => {
    return(
        <div className="relative ml-2 rounded-lg bg-green-50 px-4 py-2 text-base text-green-600 shadow-sm border border-green-200">
            <span className="flex items-center gap-1">
                <BiError color="green"/>
                <strong className="font-bold">{leaderName}</strong> 팀장님, 에디터에서 프로젝트 정보를 작성해주세요!
            </span>
        </div>
    );
};

export default LeaderMessage;