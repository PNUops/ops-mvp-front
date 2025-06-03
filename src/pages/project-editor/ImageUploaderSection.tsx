// src/pages/project-editor/ImageUploader.tsx
import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableThumbnail from './SortableThumbnail';

interface ImageUploaderProps {
  thumbnails: File[];
  setThumbnails: React.Dispatch<React.SetStateAction<File[]>>;
}

const MAX_IMAGES = 6;

const ImageUploaderSection = ({ thumbnails, setThumbnails }: ImageUploaderProps) => {
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setThumbnails((prev) => [...prev, ...files].slice(0, MAX_IMAGES));
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
    setThumbnails((prev) => [...prev, ...imageFiles].slice(0, MAX_IMAGES));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const paddedThumbnails: (File | null)[] = [...thumbnails];
  while (paddedThumbnails.length < MAX_IMAGES) paddedThumbnails.push(null);

  return (
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
          <label className="text-mainGreen cursor-pointer rounded-full bg-[#D1F3E1] px-15 py-4 text-sm font-bold">
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
  );
};

export default ImageUploaderSection;
