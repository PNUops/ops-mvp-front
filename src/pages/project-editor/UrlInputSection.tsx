import React, { useState } from 'react';

import { RiLink } from 'react-icons/ri';
import { FaGithub, FaYoutube } from 'react-icons/fa';

interface UrlInputSectionProps {
  prodUrl: string | null;
  setProdUrl: (value: string) => void;
  githubUrl: string;
  setGithubUrl: (value: string) => void;
  youtubeUrl: string;
  setYoutubeUrl: (value: string) => void;
}

const UrlInputSection = ({
  prodUrl,
  setProdUrl,
  githubUrl,
  setGithubUrl,
  youtubeUrl,
  setYoutubeUrl,
}: UrlInputSectionProps) => {
  return (
    <div className="flex flex-col gap-5 text-sm sm:flex-row sm:gap-10">
      <div className="text-midGray flex w-25">
        <span className="mr-1 text-red-500">*</span>
        <span>URL</span>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="relative w-full">
          <FaGithub className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="url"
            placeholder="https://github.com/ (필수)"
            className="placeholder-lightGray focus:ring-lightGray w-full truncate rounded bg-gray-100 py-3 pr-5 pl-15 text-sm text-black duration-300 ease-in-out focus:ring-1 focus:outline-none"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />
        </div>
        <div className="relative w-full">
          <FaYoutube className="absolute top-1/2 left-5 -translate-y-1/2 text-red-400" size={20} />
          <input
            type="url"
            placeholder="https://youtube.com/ (필수)"
            className="placeholder-lightGray focus:ring-lightGray w-full truncate rounded bg-gray-100 py-3 pr-5 pl-15 text-sm text-black duration-300 ease-in-out focus:ring-1 focus:outline-none"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </div>
        <div className="relative w-full">
          <RiLink className="text-mainGreen/50 absolute top-1/2 left-5 -translate-y-1/2" size={20} />
          <input
            type="url"
            placeholder="https://your-project.vercel.app (선택)"
            className="placeholder-lightGray focus:ring-lightGray w-full truncate rounded bg-gray-100 py-3 pr-5 pl-15 text-sm text-black duration-300 ease-in-out focus:ring-1 focus:outline-none"
            value={prodUrl ?? ''}
            onChange={(e) => setProdUrl(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default UrlInputSection;
