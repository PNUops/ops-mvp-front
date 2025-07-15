import React, { useState, useMemo } from 'react';
import { useToast } from 'hooks/useToast';
import { imageValidator } from 'utils/image';
import { ThumbnailResult } from 'apis/projectEditor';
import { PreviewResult } from 'types/DTO/projectViewerDto';

import { HiInformationCircle } from 'react-icons/hi';
import { FiX } from 'react-icons/fi';
import { AiFillPicture } from 'react-icons/ai';
import { MdOutlineFileUpload, MdBrokenImage } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';

interface ImageUploaderSectionProps {
  thumbnail: ThumbnailResult | File | undefined;
  setThumbnail: (thumb: ThumbnailResult | File | undefined) => void;
  previews: (PreviewResult | File)[];
  setPreviews: React.Dispatch<React.SetStateAction<(PreviewResult | File)[]>>;
  setThumbnailToDelete: (value: boolean) => void;
  previewsToDelete: number[];
  setPreviewsToDelete: React.Dispatch<React.SetStateAction<number[]>>;
}

const getImageSrc = (data: File | ThumbnailResult | PreviewResult): string => {
  if (data instanceof File) {
    return URL.createObjectURL(data);
  }
  if ('status' in data && data.status === 'success' && typeof data.url === 'string') {
    return data.url;
  }
  return '';
};

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

  const images: (ThumbnailResult | PreviewResult | File | undefined)[] = useMemo(() => {
    const thumbnailSlot: ThumbnailResult | File | undefined =
      thumbnail && (thumbnail instanceof File || (thumbnail as ThumbnailResult).status !== 'error')
        ? thumbnail
        : undefined;
    const result: (ThumbnailResult | PreviewResult | File | undefined)[] = [thumbnailSlot, ...previews];
    return result.slice(0, MAX_IMAGES);
  }, [thumbnail, previews]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (files.length === 0) return;

    const validate = imageValidator(files);
    if (!validate.isValid) {
      validate.message.forEach((msg) => toast(msg, 'error'));
      return;
    }

    const currentImageCount =
      (thumbnail && (thumbnail instanceof File || (thumbnail as ThumbnailResult).status !== 'error') ? 1 : 0) +
      previews.length;
    const newImageCount = currentImageCount + files.length;

    if (newImageCount > MAX_IMAGES) {
      toast(`이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있어요`, 'error');
      return;
    }

    const newFiles: File[] = files.filter((file) => file.size > 0);

    const MAX_PREVIEWS = MAX_IMAGES - 1;
    const isEmptyThumbnail =
      !thumbnail || (thumbnail instanceof File ? false : (thumbnail as ThumbnailResult).status === 'error');

    if (isEmptyThumbnail) {
      const first = newFiles[0];
      if (!first) {
        toast('썸네일로 사용할 수 있는 이미지가 없어요', 'error');
        return;
      }
      const rest = newFiles.slice(1);
      const combinedPreviews = [...previews, ...rest].slice(0, MAX_PREVIEWS);
      setThumbnail(first);
      setPreviews(combinedPreviews);
    } else {
      const combined = [...previews, ...newFiles].slice(0, MAX_PREVIEWS);
      setPreviews(combined);
    }

    toast('이미지가 업로드 되었어요', 'success');
  };

  const handleRemove = (index: number) => {
    const target = images[index];
    if (!target) return;

    if (index === 0) {
      if (!(target instanceof File) && 'status' in target && target.status === 'success') {
        setThumbnailToDelete(true);
      }
      setThumbnail(undefined);
      toast('이미지를 삭제했어요', 'info');
      return;
    }

    const previewToRemove = previews[index - 1];
    if (previewToRemove) {
      if (!(previewToRemove instanceof File) && 'id' in previewToRemove) {
        setPreviewsToDelete((prev) => [...prev, (previewToRemove as { id: number }).id]);
      }
    }
    const nextPreviews = previews.filter((_, i) => i !== index - 1);
    setPreviews(nextPreviews);
    toast('프리뷰 이미지를 삭제했어요', 'info');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    const validate = imageValidator(files);
    if (!validate.isValid) {
      validate.message.forEach((msg) => toast(msg, 'error'));
      return;
    }

    const currentImageCount =
      (thumbnail && (thumbnail instanceof File || (thumbnail as ThumbnailResult).status !== 'error') ? 1 : 0) +
      previews.length;
    const newImageCount = currentImageCount + files.length;

    if (newImageCount > MAX_IMAGES) {
      toast(`이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있어요`, 'error');
      return;
    }
    const newFiles: File[] = files;

    const MAX_PREVIEWS = MAX_IMAGES - 1;
    const isEmptyThumbnail =
      !thumbnail || (thumbnail instanceof File ? false : (thumbnail as ThumbnailResult).status === 'error');

    if (isEmptyThumbnail) {
      const first = newFiles[0];
      if (!first) {
        toast('썸네일로 사용할 수 있는 이미지가 없어요', 'error');
        return;
      }
      const rest = newFiles.slice(1);
      const combinedPreviews = [...previews, ...rest].slice(0, MAX_PREVIEWS);
      setThumbnail(first);
      setPreviews(combinedPreviews);
    } else {
      const combined = [...previews, ...newFiles].slice(0, MAX_PREVIEWS);
      setPreviews(combined);
    }

    toast('이미지가 업로드 되었어요', 'success');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const paddedImages: (ThumbnailResult | PreviewResult | File | undefined)[] = [...images];
  while (paddedImages.length < MAX_IMAGES) paddedImages.push(undefined);

  return (
    <div className="flex gap-10 text-sm">
      <div className="flex flex-col items-start gap-3">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span>이미지</span>
        </div>
        <div className="group relative inline-block">
          <span className="ml-1 inline-flex animate-bounce cursor-help items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs text-green-500">
            <HiInformationCircle /> 가이드
          </span>

          <div className="absolute top-1/2 left-full z-10 ml-3 w-64 -translate-y-1/2 rounded bg-green-50 p-3 text-xs text-green-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-80">
            권장 비율: <strong>3:2</strong> (예: 1500×1000)
            <br />
            최대 용량: <strong>2MB</strong>
            <br />
            허용 확장자: <strong>.jpg, .png, .gif, .bmp, .webp</strong>
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
          {paddedImages.map((img, index) => {
            if (!img) {
              return (
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
              );
            }

            let displayContent;
            if (img instanceof File) {
              displayContent = (
                <img
                  src={getImageSrc(img)}
                  alt={`image-${index}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              );
            } else if ('status' in img) {
              if (img.status === 'processing') {
                displayContent = (
                  <div className="text-lightGray flex h-full w-full animate-pulse flex-col items-center justify-center gap-5">
                    <CgSandClock size={25} />
                    <span className="text-center text-xs">
                      서버에서 이미지를 압축 중이에요<br></br>조금만 기다려주세요!
                    </span>
                  </div>
                );
              } else if (img.status === 'error') {
                displayContent = <MdBrokenImage size={30} className="text-red-300" />;
              } else if (img.status === 'success') {
                if (typeof img.url === 'string') {
                  displayContent = (
                    <img
                      src={getImageSrc(img)}
                      alt={`image-${index}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  );
                } else {
                  displayContent = <MdBrokenImage size={30} className="text-red-300" />;
                }
              } else {
                displayContent = <MdBrokenImage size={30} className="text-red-300" />;
              }
            } else {
              displayContent = <MdBrokenImage size={30} className="text-red-300" />;
            }

            return (
              <div
                key={index}
                className="border-lightGray text-lightGray relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded border text-xs"
              >
                {displayContent}

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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageUploaderSection;
