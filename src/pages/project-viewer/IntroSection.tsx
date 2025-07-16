import { useNavigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';
import { useUserStore } from 'stores/useUserStore';

import { FaGithub, FaYoutube } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { RiLink } from 'react-icons/ri';
import { FiExternalLink } from 'react-icons/fi';

interface IntroSectionProps {
  contestId: number;
  teamId: number;
  isEditor: boolean;
  projectName: string;
  teamName: string;
  productionUrl: string | null;
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
      className="border-mainGreen text-mainGreen hover:border-mainGreen inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full border transition-colors duration-200 hover:bg-[#D1F3E1]/60 focus:outline-none sm:w-auto sm:px-5"
    >
      <span className="text-exsm hidden font-medium whitespace-nowrap sm:inline-block">{text}</span>
      <FiExternalLink className="text-subGreen shrink-0" />
    </a>
  );
};

const IntroSection = ({
  contestId,
  teamId,
  isEditor,
  projectName,
  teamName,
  productionUrl,
  githubUrl,
  youtubeUrl,
}: IntroSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-w-xs flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col items-center gap-2 md:items-start">
        <div className="sm:text-title pt-1 text-xl leading-none font-bold">{projectName}</div>
        <div className="text-midGray text-exsm font-bold sm:text-sm">{teamName}</div>
      </div>
      <div className="flex items-center gap-3">
        {isEditor && (
          <div className="flex">
            <button
              onClick={() => navigate(`/teams/edit/${teamId}`)}
              className="border-midGray text-exsm text-midGray hover:text-mainGreen hover:border-mainGreen flex h-10 w-10 items-center justify-center gap-2 rounded-full border px-5 transition-colors duration-200 hover:cursor-pointer hover:bg-[#D1F3E1]/60 sm:w-auto"
            >
              <span className="hidden whitespace-nowrap sm:inline">수정하기</span>{' '}
              <FaEdit className="text-lightGray shrink-0" />
            </button>
          </div>
        )}
        {productionUrl && <UrlButton url={productionUrl} />}
      </div>
    </div>
  );
};

export default IntroSection;
