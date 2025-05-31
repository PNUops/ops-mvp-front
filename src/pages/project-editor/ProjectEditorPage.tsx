import React, { useState, useRef } from 'react';
import { FaYoutube, FaGithub } from 'react-icons/fa';

import SortableThumbnail from './SortableThumbnail';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { project_view } from '@mocks/data/viewer';
import MembersInput from './MembersInput';

const MAX_TEAM_MEMBERS = 6;
const MAX_IMAGES = 6;
const MAX_OVERVIEW = 400;

const ProjectEditorPage = () => {
  const [members, setMembers] = useState<string[]>(['']);
  const [overview, setOverview] = useState('');
  const [thumbnails, setThumbnails] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMemberChange = (index: number, name: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = name;
    setMembers(updatedMembers);
  };

  const handleMemberAdd = (name: string) => {
    if (members.length < MAX_TEAM_MEMBERS) {
      setMembers([...members, name]);
    } else {
      alert(`최대 추가할 수 있는 팀원 {MAX_TEAM_MEMBERS}명을 초과하였습니다.`);
    }
  };

  const handleMemberRemove = (index: number) => {
    const remainingMembers = members.filter((_, i) => i !== index);
    setMembers(remainingMembers);
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setThumbnails((prev) => [...prev, ...files].slice(0, 6));
  };

  const handleThumbnailRemove = (index: number) => {
    setThumbnails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setThumbnails((items) => {
        const oldIndex = active.id as number;
        const newIndex = over.id as number;
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleThumbnailDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    setThumbnails((prev) => [...prev, ...imageFiles].slice(0, 6));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 드롭 가능하게 만들기 위해 필요
  };

  const paddedThumbnails: (File | null)[] = [...thumbnails];
  while (paddedThumbnails.length < 6) paddedThumbnails.push(null);

  const handleOverviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_OVERVIEW) {
      setOverview(e.target.value);
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div>
      <div className="text-title font-bold">프로젝트 생성</div>
      <div className="h-10" />
      <div className="flex gap-10 text-sm">
        <div className="text-midGray flex w-25 flex-col gap-1 pl-3">
          <span>프로젝트</span>
          <span>팀명</span>
          <span>팀장</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>{project_view.projectName}</span>
          <span>{project_view.teamName}</span>
          <span>{project_view.leaderName}</span>
        </div>
      </div>
      <div className="h-15" />
      <div className="flex gap-10 text-sm">
        <div className="text-midGray flex w-25">
          <span className="mr-1 text-red-500">*</span>
          <span>팀원</span>
        </div>
        <MembersInput
          memberList={members}
          onMemberChange={handleMemberChange}
          onMemberAdd={handleMemberAdd}
          onMemberRemove={handleMemberRemove}
          max={MAX_TEAM_MEMBERS}
        />
      </div>
      <div className="h-15" />
      <div className="flex gap-10 text-sm">
        <div className="text-midGray flex w-25">
          <span className="mr-1 text-red-500">*</span>
          <span>URL</span>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="relative w-full">
            <FaGithub className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="url"
              placeholder="https://github.com/"
              className="placeholder-lightGray focus:ring-lightGray w-full rounded bg-gray-100 py-3 pl-15 text-sm text-black focus:ring-2 focus:outline-none"
            />
          </div>
          <div className="relative w-full">
            <FaYoutube className="absolute top-1/2 left-5 -translate-y-1/2 text-red-400" size={20} />
            <input
              type="url"
              placeholder="https://youtube.com/"
              className="placeholder-lightGray focus:ring-lightGray w-full rounded bg-gray-100 py-3 pl-15 text-sm text-black focus:ring-2 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="h-15" />
      <div className="flex gap-10 text-sm">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span>썸네일</span>
        </div>
        <div className="flex w-full flex-1 flex-col gap-3 md:flex-row">
          <div
            className="border-midGray text-midGray flex min-h-[250px] flex-1 flex-col items-center justify-evenly rounded border p-10 text-center"
            onDrop={handleThumbnailDrop}
            onDragOver={handleDragOver}
          >
            <p>
              파일을 이곳에 끌어놓아주세요.
              <br />
              Drag & Drop images here.
            </p>
            <p className="text-midGray my-2">OR</p>
            <label className="text-mainGreen w-[50%] cursor-pointer rounded-full bg-[#D1F3E1] px-5 py-4 text-sm font-bold">
              파일 업로드
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleThumbnailUpload} />
            </label>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-3 text-center sm:grid-cols-2">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={paddedThumbnails.map((_, i) => i)} strategy={verticalListSortingStrategy}>
                {paddedThumbnails.map((file, index) => (
                  <SortableThumbnail key={index} file={file} index={index} onRemove={handleThumbnailRemove} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
      <div className="h-15" />
      <div className="flex gap-10 text-sm">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span className="w-full">Overview</span>
        </div>
        <div className="flex-1 flex-col">
          <textarea
            ref={textareaRef}
            placeholder={`Overview를 입력해주세요. (최대 ${MAX_OVERVIEW}자)`}
            className="placeholder-lightGray focus:outline-lightGray w-full rounded bg-gray-100 p-5 text-sm"
            value={overview}
            onChange={handleOverviewChange}
          />
          <div className={`text-right text-xs ${overview.length === MAX_OVERVIEW ? 'text-red-500' : 'text-gray-500'}`}>
            {overview.length} / {MAX_OVERVIEW}자
          </div>
        </div>
      </div>

      <div className="h-20" />
      <div className="flex justify-center">
        <button className="bg-mainGreen rounded-full px-15 py-4 text-sm font-bold text-white">저장</button>
      </div>
    </div>
  );
};

export default ProjectEditorPage;
