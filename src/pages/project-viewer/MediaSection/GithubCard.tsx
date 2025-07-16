import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { GithubCardSkeleton } from '../ViewerSkeleton';
import { fetchGithubContent } from 'utils/media';
import { FaGithub } from 'react-icons/fa';

export type GithubContentType = 'repo' | 'profile';

interface GithubCardProps {
  githubRepoUrl: string;
}

export interface GithubRepoData {
  name: string;
  description: string;
  language: string;
  owner: {
    avatar_url: string;
  };
}

export interface GithubProfileData {
  login: string;
  avatar_url: string;
  html_url: string;
  bio?: string;
  name?: string;
  type: 'User' | 'Organization';
}

const GithubCard = ({ githubRepoUrl }: GithubCardProps) => {
  const { mutate, data, isPending, isError } = useMutation({
    mutationFn: fetchGithubContent,
  });

  useEffect(() => {
    if (githubRepoUrl) mutate(githubRepoUrl);
  }, [githubRepoUrl, mutate]);

  if (isPending) return <GithubCardSkeleton />;
  if (isError || !data) return null;

  if (data.type === 'repo') {
    const repo = data.data as GithubRepoData;
    return (
      <a
        href={githubRepoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center rounded border border-gray-200 p-3 hover:bg-gray-50"
      >
        <img src={repo.owner.avatar_url} alt="owner" className="mx-5 h-10 w-10 rounded-full border border-gray-300" />
        <div className="ml-3 flex flex-1 flex-col text-sm">
          <span className="font-semibold">{repo.name}</span>
          <span className="hidden w-full max-w-[500px] truncate text-xs text-gray-500 sm:block">
            {repo.description}
          </span>
          <span className="text-xs text-gray-400">{repo.language}</span>
        </div>
        <FaGithub size={30} className="mx-5 shrink-0 text-xl text-black" />
      </a>
    );
  }

  if (data.type === 'profile') {
    const profile = data.data as GithubProfileData;
    return (
      <a
        href={profile.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center rounded border border-gray-200 p-4 hover:bg-gray-50"
      >
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="mx-5 h-14 w-14 rounded-full border border-gray-300"
        />
        <div className="ml-3 flex flex-col text-sm">
          <span className="text-lg font-semibold">{profile.name || profile.login}</span>
          <span className="text-xs text-gray-500">{profile.bio}</span>
          <span className="text-xs text-gray-400">{profile.type}</span>
        </div>
        <FaGithub size={30} className="mx-5 shrink-0 text-xl text-black" />
      </a>
    );
  }

  return null;
};

export default GithubCard;
