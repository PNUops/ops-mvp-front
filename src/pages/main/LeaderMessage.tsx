import { BiError } from 'react-icons/bi';

interface LeaderProps {
  leaderName: string;
}

const LeaderMessage = ({ leaderName }: LeaderProps) => {
  return (
    <div className="text-mainRed flex items-center gap-1">
      <BiError className="text-4xl" />
      <span className="text-sm">
        <strong>{leaderName}</strong> 팀장님
      </span>
      <span className="text-sm">에디터에서 프로젝트 정보를 작성해 주세요!</span>
    </div>
  );
};

export default LeaderMessage;
