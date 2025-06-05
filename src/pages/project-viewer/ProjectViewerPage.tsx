import React, { useState, useRef } from 'react';
import Carousel from './Carousel';
import CommentSection from './CommentSection';
import { GoPencil } from 'react-icons/go';
import { FaHeart } from 'react-icons/fa';
import { PiCrown } from 'react-icons/pi';
import { IoPersonOutline } from 'react-icons/io5';

import { project_view } from '@mocks/data/viewer';
import MediaEmbedder from './MediaEmbedder';

const ProjectViewerPage = () => {
  const { projectName, teamName, isLiked, overview, leaderName, participants, githubPath, youTubePath } = project_view;

  return (
    <div>
      <div className="flex gap-10">
        <div className="text-[36px] font-bold">{projectName}</div>
        <button className="border-midGray text-exsm flex items-center gap-3 rounded-full border px-5">
          <GoPencil />
          수정하기
        </button>
      </div>
      <div className="text-smbold flex font-bold">{teamName}</div>
      <div className="h-10" />
      <Carousel />
      <div className="h-10" />
      <button
        className={`bg-${isLiked ? 'mainGreen' : 'lightGray'} relative flex items-center gap-5 justify-self-center rounded-full px-5 py-3 text-sm text-white sm:px-8`}
      >
        <FaHeart className={`text-${isLiked ? 'white' : 'midGray'}`} size={20} />
        <span className="hidden sm:inline">좋아요</span>
      </button>
      <div className="h-20" />
      <div className="flex flex-col gap-5">
        <div className="text-title font-bold">Overview</div>
        <div className="text-sm leading-[1.8]">{overview}</div>
      </div>
      <div className="h-20" />
      <div className="flex flex-col gap-5">
        <div className="text-title font-bold">Participants</div>
        <span className="flex items-center gap-3">
          <PiCrown />
          <span className="text-sm">{leaderName}</span>
        </span>
        <span className="flex items-center gap-3">
          <IoPersonOutline />
          {participants.map((name, index) => (
            <span key={index} className="text-sm">
              {name}
            </span>
          ))}
        </span>
      </div>
      <div className="h-20" />
      <div className="flex flex-col gap-5">
        <div className="text-title font-bold">URL</div>
        <MediaEmbedder githubUrl={githubPath} youtubeUrl={youTubePath} />
      </div>
      <div className="h-20" />
      <CommentSection />
    </div>
  );
};

export default ProjectViewerPage;
