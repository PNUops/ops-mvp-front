import React, { useState, useRef } from 'react';
import { FaYoutube, FaGithub } from 'react-icons/fa';

import SortableThumbnail from './SortableThumbnail';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

import projectInfo from './projectInfo';

const ProjectEditorPage = () => {
  const [members, setMembers] = useState<string[]>(['']);
  const [overview, setOverview] = useState('');
  const [thumbnails, setThumbnails] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMemberChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...members];
    updated[index] = event.target.value;
    setMembers(updated);
  };
  const handleMemberAdd = () => {
    if (members.length < 6) {
      setMembers([...members, '']);
    }
  };
  const handleMemberRemove = (index: number) => {
    if (members.length > 1) {
      const updated = members.filter((_, i) => i !== index);
      setMembers(updated);
    }
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
    if (e.target.value.length <= 400) {
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
        <div className="text-midGray flex w-20 flex-col gap-1">
          <span>프로젝트</span>
          <span>팀명</span>
          <span>팀장</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>{projectInfo.project}</span>
          <span>{projectInfo.teamName}</span>
          <span>{projectInfo.teamLeader}</span>
        </div>
      </div>
      <div className="h-15" />
      {/* 팀원 추가 */}
      <div className="flex gap-10 text-sm">
        <div className="text-midGray flex w-20 flex-col">
          <span>팀원</span>
        </div>
        <div className="flex flex-col gap-1">
          {members.map((member, index) => (
            <div key={index} className="mb-2 flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  className="rounded border p-2"
                  placeholder="멤버를 입력해주세요."
                  value={member}
                  onChange={(e) => handleMemberChange(index, e)}
                />
              </div>
              <button
                onClick={() => (member ? handleMemberRemove(index) : handleMemberAdd())}
                className="text-blue-500"
                disabled={!member && members.length >= 6}
                title={members.length >= 6 ? '최대 6명까지 입력 가능합니다.' : ''}
              >
                {member ? '—' : '+'}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="h-15" />
      <div className="flex gap-10 text-sm">
        <div className="text-midGray flex w-20 flex-col gap-1">
          <span>URL</span>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="border-midGray flex items-center gap-3 rounded border p-3 text-sm text-black">
            <span className="mx-2">
              <FaGithub className="text-gray-600" size={20} />
            </span>
            <input
              type="url"
              placeholder="https://github.com/"
              className="placeholder-midGray flex-1 text-sm text-black outline-none"
            />
          </div>
          <div className="border-midGray flex items-center gap-3 rounded border p-3 text-sm text-black">
            <span className="mx-2">
              <FaYoutube className="text-red-500" size={20} />
            </span>
            <input
              type="url"
              placeholder="https://youtube.com/"
              className="placeholder-midGray flex-1 text-sm text-black outline-none"
            />
          </div>
        </div>
      </div>
      <div className="h-15" />
      <div className="flex gap-10 text-sm">
        <div className="text-midGray flex w-20 flex-col gap-1">
          <span>썸네일</span>
        </div>
        <div className="max-width-[750px] flex flex-1 flex-col">
          <div
            className="border-midGray flex h-full flex-col gap-3 rounded border p-10 text-center text-gray-400"
            onDrop={handleThumbnailDrop}
            onDragOver={handleDragOver}
          >
            <p>
              파일을 이곳에 끌어놓아주세요.
              <br />
              Drag & Drop images here.
            </p>
            <p className="my-2 text-gray-500">OR</p>
            <label className="bg-whiteGray cursor-pointer rounded-full px-5 py-4 text-sm font-bold">
              파일 업로드
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleThumbnailUpload} />
            </label>
          </div>
        </div>
        <div className="grid w-[250px] flex-shrink-0 grid-cols-3 gap-3 text-center sm:grid-cols-2">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={paddedThumbnails.map((_, i) => i)} strategy={verticalListSortingStrategy}>
              {paddedThumbnails.map((file, index) => (
                <SortableThumbnail key={index} file={file} index={index} onRemove={handleThumbnailRemove} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
      <div className="h-15" />
      <div className="flex gap-10 text-sm">
        <div className="text-midGray flex w-20 gap-1">
          <span className="w-full">Overview</span>
        </div>
        <div className="flex-1 flex-col">
          <textarea
            ref={textareaRef}
            placeholder="Overview를 입력해주세요. (최대 400자)"
            className="border-midGray placeholder-midGray h-[160px] w-full resize-none overflow-auto rounded border p-3 text-sm focus:outline-none"
            value={overview}
            onChange={handleOverviewChange}
          />
          <div className={`text-right text-xs ${overview.length === 400 ? 'text-red-500' : 'text-gray-500'}`}>
            {overview.length} / 400자
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
