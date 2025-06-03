import useAuth from 'hooks/useAuth';
import { GoPencil } from 'react-icons/go';

interface IntroSectionProps {
  projectName: string;
  teamName: string;
}

const IntroSection = ({ projectName, teamName }: IntroSectionProps) => {
  const { isLeader } = useAuth();

  return (
    <>
      <div className="flex items-center gap-10">
        <div className="text-[36px] font-bold">{projectName}</div>
        {isLeader && (
          <button className="border-midGray text-exsm flex items-center gap-3 rounded-full border px-5 py-1 text-gray-700 hover:cursor-pointer">
            <GoPencil />
            수정하기
          </button>
        )}
      </div>
      <div className="text-smbold flex font-bold">{teamName}</div>
    </>
  );
};

export default IntroSection;
