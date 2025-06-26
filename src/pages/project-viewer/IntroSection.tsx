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
  youtubeUrl: string;
}

const UrlButton = ({ url }: { url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="border-mainGreen flex w-100 max-w-100 items-center gap-3 truncate rounded-full border px-3 py-1 focus:outline-none sm:w-auto"
  >
    <IoMdLink className="text-mainGreen shrink-0" />
    <span className="text-exsm hover:text-mainGreen min-w-0 truncate text-gray-700">{url}</span>
  </a>
);

const IntroSection = ({ teamId, leaderId, projectName, teamName, githubUrl, youtubeUrl }: IntroSectionProps) => {
  const { isLeader } = useAuth();
  const memberId = useUserStore((state) => state.user?.id);
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-wrap justify-between gap-4">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <div className="min-w-0 text-[28px] font-bold break-words sm:text-[36px]">{projectName}</div>
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
        <div className="text-smbold font-bold break-words text-[#4B5563]">{teamName}</div>
      </div>
      <div className="flex w-full max-w-full min-w-[150px] flex-col items-end gap-2 sm:w-auto">
        {githubUrl && <UrlButton url={githubUrl} />}
        {youtubeUrl && <UrlButton url={youtubeUrl} />}
      </div>
    </div>
  );
};

export default IntroSection;
