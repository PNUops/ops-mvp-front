import React, { useState, useEffect } from 'react';
import { FaGithub, FaYoutube } from 'react-icons/fa';

interface MediaEmbedderProps {
  githubUrl: string;
  youtubeUrl: string;
}

interface GithubRepoData {
  name: string;
  description: string;
  language: string;
  owner: {
    avatar_url: string;
  };
}

const GithubCard = ({ repoUrl }: { repoUrl: string }) => {
  const [repoData, setRepoData] = useState<GithubRepoData | null>(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const path = new URL(repoUrl).pathname;
        const response = await fetch(`https://api.github.com/repos${path}`);
        const data = await response.json();
        setRepoData(data);
      } catch (e) {
        alert('GitHub 레포지토리를 불러오는 데 실패했어요.');
      }
    };
    fetchRepoData();
  }, [repoUrl]);

  if (!repoData) return null;

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center rounded border border-gray-200 p-3 hover:bg-gray-50"
    >
      <img src={repoData.owner.avatar_url} alt="owner" className="mx-5 h-10 w-10 rounded-full border border-gray-300" />
      <div className="ml-3 flex flex-1 flex-col text-sm">
        <span className="font-semibold">{repoData.name}</span>
        <span className="max-w-[500px] truncate text-xs text-gray-500">{repoData.description}</span>
        <span className="text-xs text-gray-400">{repoData.language}</span>
      </div>
      <FaGithub className="mx-5 text-xl text-black" />
    </a>
  );
};

const getYoutubeEmbedUrl = (url: string): string => {
  try {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return '';
  } catch (e) {
    alert('YouTube 영상 링크를 불러오는 데 실패했어요.');
    return '';
  }
};

const YoutubeCard = ({ videoUrl }: { videoUrl: string }) => {
  const youtubeEmbedUrl: string | null = getYoutubeEmbedUrl(videoUrl);
  if (!youtubeEmbedUrl) return null;

  return (
    <div className="aspect-video w-full">
      <iframe
        className="h-full w-full rounded"
        src={youtubeEmbedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const MediaEmbedder = ({ githubUrl, youtubeUrl }: MediaEmbedderProps) => {
  return (
    <div className="flex flex-col gap-5">
      {githubUrl && <GithubCard repoUrl={githubUrl} />}
      {youtubeUrl && <YoutubeCard videoUrl={youtubeUrl} />}
    </div>
  );
};

export default MediaEmbedder;
