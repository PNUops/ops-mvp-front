import { BiError } from 'react-icons/bi';

interface LeaderProps {
  leaderName: string;
}

const LeaderMessage = ({ leaderName }: LeaderProps) => {
  return (
    <div className="text-mainRed flex items-center flex items-center gap-2 flex-1 overflow-hidden">
      <BiError className="w-10 h-10 flex-shrink-0" />
      <span className="truncate text-sm">
        <strong className="text-xl">{leaderName}</strong> 팀장님, 에디터에서 프로젝트 정보를 작성해 주세요!
      </span>
    </div>
  );
};

export default LeaderMessage;
