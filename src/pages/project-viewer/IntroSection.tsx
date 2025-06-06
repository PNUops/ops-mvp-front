import useAuth from 'hooks/useAuth';
import { useUserStore } from 'stores/useUserStore';
import { GoPencil } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

interface IntroSectionProps {
  teamId: number;
  leaderId: number;
  projectName: string;
  teamName: string;
}

const IntroSection = ({ teamId, leaderId, projectName, teamName }: IntroSectionProps) => {
  const { isLeader } = useAuth();
  const memberId = useUserStore((state) => state.user?.id);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center gap-10">
        <div className="text-[36px] font-bold">{projectName}</div>
        {isLeader && (memberId === leaderId) &&  (
          <button onClick={() => navigate(`/teams/edit/${teamId}`)}className="border-midGray text-exsm flex items-center gap-3 rounded-full border px-5 py-1 text-gray-700 hover:cursor-pointer">
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
