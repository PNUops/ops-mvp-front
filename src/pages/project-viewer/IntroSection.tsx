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
  prodUrl: string | null;
  githubUrl: string;
  youtubeUrl: string;
}

const UrlButton = ({ url }: { url: string }) => {
  const getIconAndText = () => {
    if (url.includes('github.com')) {
      return { icon: <FaGithub className="text-black" />, text: 'GitHub' };
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return { icon: <FaYoutube className="text-red-500" />, text: 'Youtube' };
    }
    if (url.includes('https://')) {
      return { icon: <RiLink className="text-mainGreen" />, text: '프로젝트 보러가기' };
    }
    return undefined;
  };

  const result = getIconAndText();
  if (!result) return null;
  const { icon, text } = result;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="border-lightGray hover:border-mainGreen inline-flex w-45 items-center gap-2 rounded-full border px-4 py-1 transition-colors duration-200 hover:bg-[#D1F3E1]/60 focus:outline-none"
    >
      <span className="shrink-0">{icon}</span>
      <span className="text-xs whitespace-nowrap text-gray-700">{text}</span>
      <FiExternalLink className="text-lightGray ml-auto shrink-0" />
    </a>
  );
};

const IntroSection = ({
  teamId,
  leaderId,
  projectName,
  teamName,
  prodUrl,
  githubUrl,
  youtubeUrl,
}: IntroSectionProps) => {
  const { isLeader } = useAuth();
  const memberId = useUserStore((state) => state.user?.id);
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-wrap items-start gap-4">
      <div className="flex justify-start gap-5">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="text-title min-w-0 leading-none font-bold">{projectName}</div>
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

      <div className="flex w-full flex-1 flex-col items-end gap-2">
        {prodUrl && <UrlButton url={prodUrl} />}
        {githubUrl && <UrlButton url={githubUrl} />}
        {youtubeUrl && <UrlButton url={youtubeUrl} />}
      </div>
    </div>
  );
};

export default IntroSection;
