import { useNavigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';
import { useUserStore } from 'stores/useUserStore';

import { GoPencil } from 'react-icons/go';
import { IoMdLink } from 'react-icons/io';

interface IntroSectionProps {
  teamId: number;
  leaderId: number;
  projectName: string;
  teamName: string;
  githubUrl: string;
}

const UrlButton = ({ url }: { url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="border-mainGreen flex w-full max-w-full items-center gap-3 truncate rounded-full border px-3 py-1 focus:outline-none sm:w-auto"
  >
    <IoMdLink className="text-mainGreen shrink-0" />
    <span className="text-exsm hover:text-mainGreen min-w-0 truncate text-gray-700">{url}</span>
  </a>
);

const IntroSection = ({ teamId, leaderId, projectName, teamName, githubUrl }: IntroSectionProps) => {
  const { isLeader } = useAuth();
  const memberId = useUserStore((state) => state.user?.id);
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="text-[36px] font-bold">{projectName}</div>
          {isLeader && memberId === leaderId && (
            <button
              onClick={() => navigate(`/teams/edit/${teamId}`)}
              className="border-midGray text-exsm text-midGray hover:text-mainGreen hover:border-mainGreen flex items-center gap-2 rounded-full border px-4 py-1 transition-colors duration-200 hover:cursor-pointer hover:bg-[#D1F3E1]/60"
            >
              <GoPencil />
              수정하기
            </button>
          )}
        </div>
        <div className="text-smbold font-bold text-[#4B5563]">{teamName}</div>
      </div>
      <div className="flex w-full min-w-0 flex-col gap-2 sm:w-[50%]">
        {githubUrl && <UrlButton url={githubUrl} />}
        {/* {domainUrl && <UrlButton url={githubUrl} />} */}
      </div>
    </div>
  );
};

export default IntroSection;
