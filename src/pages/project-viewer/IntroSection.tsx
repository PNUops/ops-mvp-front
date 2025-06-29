import { useNavigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';
import { useUserStore } from 'stores/useUserStore';

import { FaGithub, FaYoutube } from 'react-icons/fa';
import { GoPencil } from 'react-icons/go';
import { RiLink } from 'react-icons/ri';
import { FiExternalLink } from 'react-icons/fi';

interface IntroSectionProps {
  teamId: number;
  leaderId: number;
  projectName: string;
  teamName: string;
  githubUrl: string;
  youtubeUrl: string;
}

const UrlButton = ({ url }: { url: string }) => {
  const getIconAndText = () => {
    if (url.includes('github.com')) {
      return { icon: <FaGithub className="text-mainGreen" />, text: 'GitHub' };
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return { icon: <FaYoutube className="text-mainGreen" />, text: 'Youtube' };
    }
    return { icon: <RiLink className="text-mainGreen" />, text: url };
  };

  const { icon, text } = getIconAndText();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="border-mainGreen flex w-40 max-w-40 min-w-40 items-center justify-around gap-3 truncate rounded-full border px-3 py-1 focus:outline-none sm:w-auto"
    >
      <span className="shrink-0">{icon}</span>
      <span className="text-exsm hover:text-mainGreen w-20 truncate text-gray-700">{text}</span>
      <FiExternalLink className="text-subGreen" />
    </a>
  );
};

const IntroSection = ({ teamId, leaderId, projectName, teamName, githubUrl, youtubeUrl }: IntroSectionProps) => {
  const { isLeader } = useAuth();
  const memberId = useUserStore((state) => state.user?.id);
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-wrap gap-4">
      <div className="flex justify-start gap-5">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="min-w-0 text-[28px] font-bold sm:text-[36px]">{projectName}</div>
          <div className="text-smbold font-bold text-[#4B5563]">{teamName}</div>
        </div>
        {isLeader && memberId === leaderId && (
          <div className="flex pt-3">
            <button
              onClick={() => navigate(`/teams/edit/${teamId}`)}
              className="border-midGray text-exsm text-midGray hover:text-mainGreen hover:border-mainGreen flex h-10 items-center gap-2 rounded-full border px-4 py-1 transition-colors duration-200 hover:cursor-pointer hover:bg-[#D1F3E1]/60"
            >
              <GoPencil />
              <span className="hidden sm:inline">수정하기</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col items-end gap-2 sm:w-auto">
        {githubUrl && <UrlButton url={githubUrl} />}
        {youtubeUrl && <UrlButton url={youtubeUrl} />}
        {youtubeUrl && <UrlButton url="https://personal.url" />}
      </div>
    </div>
  );
};

export default IntroSection;
