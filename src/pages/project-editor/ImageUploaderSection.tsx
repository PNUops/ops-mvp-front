import React, { useState, useMemo } from 'react';
import { useToast } from 'hooks/useToast';

import { PreviewImage } from './ProjectEditorPage';

import { HiInformationCircle } from 'react-icons/hi';
import { FiX } from 'react-icons/fi';
import { AiFillPicture } from 'react-icons/ai';
import { MdOutlineFileUpload, MdBrokenImage } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';

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
  const toast = useToast();

  const images: (PreviewImage | undefined)[] = useMemo(() => {
    const thumbSlot = thumbnail ? { url: thumbnail } : undefined;
    const result: (PreviewImage | undefined)[] = [thumbSlot, ...previews];
    return result.slice(0, MAX_IMAGES);
  }, [thumbnail, previews]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentImageCount = (thumbnail ? 1 : 0) + previews.length;
    const newImageCount = currentImageCount + files.length;

    if (newImageCount > MAX_IMAGES) {
      toast(`이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있습니다.`, 'error');
      return;
    }

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

    const currentImageCount = (thumbnail ? 1 : 0) + previews.length;
    const newImageCount = currentImageCount + files.length;

    if (newImageCount > MAX_IMAGES) {
      toast(`이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있습니다.`, 'error');
      return;
    }

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
      <div className="flex flex-col items-start gap-3">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span>이미지</span>
        </div>
        <div className="group relative inline-block">
          <span className="inline-flex cursor-help items-center gap-1 rounded-full bg-sky-50 px-2 py-1 text-xs text-sky-400">
            <HiInformationCircle /> 가이드
          </span>
          <div className="absolute top-full left-1/2 z-10 mt-3 w-max -translate-x-1/2 rounded bg-sky-50 p-3 text-xs text-sky-400 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            3:2 비율 (예: 1500×1000)이<br></br>가장 예쁘게 보여져요!
          </div>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col gap-3 xl:flex-row">
        <div
          className="border-lightGray text-midGray sm:items-around flex flex-1 flex-col items-center justify-center gap-2 rounded border p-6 text-center sm:gap-5"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className="text-xs sm:inline sm:text-sm">파일을 이곳에 끌어놓아주세요.</p>
          <p className="text-midGray my-2 text-xs sm:inline sm:text-sm">OR</p>
          <label className="text-mainGreen flex cursor-pointer rounded-full bg-[#D1F3E1] p-4 text-sm font-bold">
            <MdOutlineFileUpload className="sm:hidden" />
            <span className="hidden px-4 sm:inline">파일 업로드</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-3 text-center sm:grid-cols-2">
          {paddedImages.map((img, index) =>
            img ? (
              <div
                key={index}
                className="border-lightGray text-lightGray relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded border text-xs"
              >
                {img.url === 'THUMBNAIL_ERR_ETC' || img.url === 'PREVIEW_ERR_ETC' ? (
                  <MdBrokenImage size={30} className="text-red-300" />
                ) : img.url === 'THUMBNAIL_ERR_409' || img.url === 'PREVIEW_ERR_409' ? (
                  <div className="text-lightGray flex h-full w-full animate-pulse flex-col items-center justify-center gap-5">
                    <CgSandClock size={25} />
                    <span className="text-center text-xs">
                      서버에서 이미지를 압축 중이에요<br></br>조금만 기다려주세요!
                    </span>
                  </div>
                ) : (
                  <img
                    src={getImageSrc(img.url)}
                    alt={`image-${index}`}
                    className="absolute inset-0 h-full w-full object-cover object-top"
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
                className="border-lightGray text-title text-lightGray relative flex aspect-[3/2] w-full items-center justify-center rounded border border-dashed"
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
