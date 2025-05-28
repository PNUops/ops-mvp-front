import warning from "assets/warning_green.svg"

type LeaderProps = {
    leaderName : string;
};

const LeaderMessage = ({ leaderName } : LeaderProps) => {
    return(
        <div className="relative ml-2 rounded-lg bg-green-50 px-4 py-2 text-base text-green-600 shadow-sm border border-green-200">
            <span className="flex items-center gap-1">
                <img src={warning} alt="경고" />
                <strong className="font-bold">{leaderName}</strong> 팀장님, 에디터에서 프로젝트 정보를 작성해주세요!
            </span>
        </div>
    );
};

export default LeaderMessage;