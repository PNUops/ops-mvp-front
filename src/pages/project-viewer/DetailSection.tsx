import { PiCrown } from 'react-icons/pi';
import { IoPersonOutline } from 'react-icons/io5';

interface DetailSectionProps {
  overview: string;
  leaderName: string;
  participants: string[];
}

const DetailSection = ({ overview, leaderName, participants }: DetailSectionProps) => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="text-title font-bold">Overview</div>
        <div className="text-sm leading-[1.8]">{overview}</div>
      </div>
      <div className="h-20" />
      <div className="flex flex-col gap-5">
        <div className="text-title font-bold">Participants</div>
        <span className="flex items-center gap-3">
          <PiCrown />
          <span className="text-sm">{leaderName}</span>
        </span>
        <span className="flex items-center gap-3">
          <IoPersonOutline />
          {participants.map((name, index) => (
            <span key={index} className="text-sm">
              {name}
            </span>
          ))}
        </span>
      </div>
    </>
  );
};

export default DetailSection;
