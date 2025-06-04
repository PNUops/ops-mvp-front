import { BiError } from "react-icons/bi";

interface LeaderProps {
    leaderName : string;
}

const LeaderMessage = ({ leaderName } : LeaderProps) => {
    return(
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4 text-red-500">
                <BiError size={40} className="opacity-80"/>
                <div className="flex flex-col leading-snug">
                    <span className="text-sm">
                      <strong>{leaderName}</strong> 팀장님
                    </span>
                    <span className="text-sm">에디터에서 프로젝트 정보를 작성해 주세요!</span>
                </div>
            </div>

        </div>

    );
};

export default LeaderMessage;