import React, { useState } from 'react';

import { RiLink } from 'react-icons/ri';
import { FaGithub, FaYoutube } from 'react-icons/fa';

interface UrlInputProps {
  productionUrl: string | null;
  setProductionUrl: (value: string) => void;
  githubUrl: string;
  setGithubUrl: (value: string) => void;
  youtubeUrl: string;
  setYoutubeUrl: (value: string) => void;
}

const UrlInput = ({
  productionUrl,
  setProductionUrl,
  githubUrl,
  setGithubUrl,
  youtubeUrl,
  setYoutubeUrl,
}: UrlInputProps) => {
  return (
    <div className="text-exsm flex flex-col gap-3 sm:flex-row sm:gap-10 sm:text-sm">
      <div className="text-midGray flex w-25 sm:py-3">
        <span className="mr-1 text-red-500">*</span>
        <span>URL</span>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="relative w-full">
          <FaGithub className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="url"
            placeholder="https://github.com/ (필수)"
            className="placeholder-lightGray focus:border-mainGreen border-lightGray w-full truncate rounded border py-3 pr-5 pl-15 text-black duration-300 ease-in-out focus:outline-none"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />
        </div>
        <div className="relative w-full">
          <FaYoutube className="absolute top-1/2 left-5 -translate-y-1/2 text-red-400" size={20} />
          <input
            type="url"
            placeholder="https://youtube.com/ (필수)"
            className="placeholder-lightGray focus:border-mainGreen border-lightGray w-full truncate rounded border py-3 pr-5 pl-15 text-black duration-300 ease-in-out focus:outline-none"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </div>
        <div className="relative w-full">
          <RiLink className="text-mainGreen/50 absolute top-1/2 left-5 -translate-y-1/2" size={20} />
          <input
            type="url"
            placeholder="https://your-project.vercel.app (선택)"
            className="placeholder-lightGray focus:border-mainGreen border-lightGray w-full truncate rounded border py-3 pr-5 pl-15 text-black duration-300 ease-in-out focus:outline-none"
            value={productionUrl ?? ''}
            onChange={(e) => setProductionUrl(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default UrlInput;
