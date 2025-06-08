import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchGithubRepoData } from 'utils/media';
import { FaGithub } from 'react-icons/fa';

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

const GithubCard = ({ githubRepoUrl }: GithubCardProps) => {
  const {
    mutate,
    data: repoData,
    isPending,
    isError,
  } = useMutation({
    mutationFn: fetchGithubRepoData,
  });

  useEffect(() => {
    if (githubRepoUrl) mutate(githubRepoUrl);
  }, [githubRepoUrl, mutate]);

  if (isPending)
    return (
      <div className="text-midGray flex h-20 flex-col items-center justify-center gap-5 rounded border border-gray-200">
        레포지토리를 불러오는 중입니다.
      </div>
    );
  if (isError || !repoData)
    return (
      <div className="text-midGray flex h-20 flex-col items-center justify-center gap-5 rounded border border-gray-200">
        유효하지 않은 레포지토리 링크입니다.
      </div>
    );

  return (
    <div className="flex flex-col gap-5 overflow-hidden">
      <a
        href={githubRepoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center rounded border border-gray-200 p-3 hover:bg-gray-50"
      >
        <img
          src={repoData.owner.avatar_url}
          alt="owner"
          className="mx-5 h-10 w-10 rounded-full border border-gray-300"
        />
        <div className="ml-3 flex flex-1 flex-col text-sm">
          <span className="font-semibold">{repoData.name}</span>
          <span className="hidden w-full max-w-[500px] truncate text-xs text-gray-500 sm:block">
            {repoData.description}
          </span>
          <span className="text-xs text-gray-400">{repoData.language}</span>
        </div>
        <FaGithub size={30} className="mx-5 shrink-0 text-xl text-black" />
      </a>
    </div>
  );
};

export default GithubCard;
