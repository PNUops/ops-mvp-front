import { BiError } from 'react-icons/bi';

interface LeaderProps {
  leaderName: string;
}

const LeaderMessage = ({ leaderName }: LeaderProps) => {
  return (
    <div className="text-mainRed flex flex-1 items-center gap-1 overflow-hidden sm:gap-2">
      <BiError className="text-xl sm:text-4xl" />
      <span className="truncate text-xs sm:text-sm">
        <strong className="sm:text-xl">{leaderName}</strong> 팀장님, 에디터에서 프로젝트 정보를 작성해 주세요!
      </span>
    </div>
  );
};

export default LeaderMessage;
