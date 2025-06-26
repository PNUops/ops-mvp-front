import React, { useState, useMemo } from 'react';
import { FiX } from 'react-icons/fi';
import { AiFillPicture } from 'react-icons/ai';
import { MdBrokenImage } from 'react-icons/md';
import { PreviewImage } from './ProjectEditorPage';

interface ImageUploaderSectionProps {
  thumbnail: string | File | undefined;
  setThumbnail: (thumb: string | File | undefined) => void;
  previews: PreviewImage[];
  setPreviews: React.Dispatch<React.SetStateAction<PreviewImage[]>>;
  setThumbnailToDelete: (value: boolean) => void;
  previewsToDelete: number[];
  setPreviewsToDelete: React.Dispatch<React.SetStateAction<number[]>>;
}

const MAX_IMAGES = 6;

const ImageUploaderSection = ({
  thumbnail,
  setThumbnail,
  previews,
  setPreviews,
  setThumbnailToDelete,
  previewsToDelete,
  setPreviewsToDelete,
}: ImageUploaderSectionProps) => {
  const images: (PreviewImage | undefined)[] = useMemo(() => {
    const thumbSlot = thumbnail ? { url: thumbnail } : undefined;
    const result: (PreviewImage | undefined)[] = [thumbSlot, ...previews];
    return result.slice(0, MAX_IMAGES);
  }, [thumbnail, previews]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPreviews: PreviewImage[] = files.map((file) => ({ url: file }));

    if (!thumbnail) {
      const first = newPreviews[0];
      const rest = newPreviews.slice(1);
      const combinedPreviews = [...previews, ...rest].slice(0, MAX_IMAGES - 1);
      setThumbnail(first.url);
      setPreviews(combinedPreviews);
    } else {
      const combined = [...previews, ...newPreviews].slice(0, MAX_IMAGES - 1);
      setPreviews(combined);
    }
  };

  const handleRemove = (index: number) => {
    const target = images[index];
    if (!target) return;

    if (index === 0) {
      if (typeof target.url === 'string') {
        setThumbnailToDelete(true);
      }
      setThumbnail(undefined);
      return;
    }

    if (target.id !== undefined) {
      setPreviewsToDelete((prev) => [...prev, target.id!]);
    }
    const next = images
      .filter((_, i) => i !== index)
      .filter((img, i) => i !== 0 && img !== undefined) as PreviewImage[];

    setPreviews(next);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    const newPreviews: PreviewImage[] = files.map((file) => ({ url: file }));
    const next = [...(thumbnail ? [{ url: thumbnail }] : []), ...previews, ...newPreviews].slice(0, MAX_IMAGES);
    setThumbnail(next[0]?.url);
    setPreviews(next.slice(1));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const getImageSrc = (data: File | string): string => (typeof data === 'string' ? data : URL.createObjectURL(data));

  const paddedImages: (PreviewImage | undefined)[] = [...images];
  while (paddedImages.length < MAX_IMAGES) paddedImages.push(undefined);

  return (
    <div className="flex gap-10 text-sm">
      <div className="text-midGray flex w-25 gap-1">
        <span className="mr-1 text-red-500">*</span>
        <span>썸네일</span>
      </div>
      <div className="flex w-full flex-1 flex-col gap-3 md:flex-row">
        <div
          className="border-midGray text-midGray flex min-h-[250px] flex-1 flex-col items-center justify-evenly rounded border p-10 text-center"
          onDrop={handleDrop}
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
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-3 text-center sm:grid-cols-2">
          {paddedImages.map((img, index) =>
            img ? (
              <div
                key={index}
                className="border-lightGray relative flex h-[120px] w-full items-center justify-center overflow-hidden rounded border text-xs text-gray-400"
              >
                {img.url === 'ERROR' ? (
                  <MdBrokenImage size={30} className="text-red-300" />
                ) : (
                  <img
                    src={getImageSrc(img.url)}
                    alt={`image-${index}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}

                {index === 0 && (
                  <span className="absolute bottom-1 left-1 rounded bg-green-100 px-2 py-0.5 text-xs text-green-600">
                    썸네일
                  </span>
                )}
                <button
                  onClick={() => handleRemove(index)}
                  className="border-lightGray bg-whiteGray absolute top-1 right-1 rounded-full border p-1"
                >
                  <FiX size={13} className="text-midGray hover:cursor-pointer" />
                </button>
              </div>
            ) : (
              <div
                key={index}
                className="border-lightGray text-title text-lightGray relative flex h-[120px] w-full items-center justify-center rounded border border-dashed"
              >
                <AiFillPicture />
                {index === 0 && (
                  <span className="absolute bottom-1 left-1 rounded bg-green-100 px-2 py-0.5 text-xs text-green-600">
                    썸네일
                  </span>
                )}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploaderSection;
