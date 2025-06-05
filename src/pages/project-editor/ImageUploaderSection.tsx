import React, { useMemo } from 'react';
import { deletePreview, deleteThumbnail } from 'apis/projectEditor';
import { FiX } from 'react-icons/fi';
import { AiFillPicture } from 'react-icons/ai';

interface ImageUploaderSectionProps {
  teamId: number;
  thumbnail: File | string | undefined;
  setThumbnail: (thumb: File | string | undefined) => void;
  previews: (File | string)[];
  setPreviews: React.Dispatch<React.SetStateAction<(File | string)[]>>;
}

const MAX_IMAGES = 6;

const ImageUploaderSection = ({
  teamId,
  thumbnail,
  setThumbnail,
  previews,
  setPreviews,
}: ImageUploaderSectionProps) => {
  const images = useMemo(() => {
    const all = thumbnail ? [thumbnail, ...previews.filter((p) => p !== thumbnail)] : [...previews];
    return all.slice(0, MAX_IMAGES);
  }, [thumbnail, previews]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const nextImages = [...images, ...files].slice(0, MAX_IMAGES);
    setThumbnail(nextImages[0]);
    setPreviews(nextImages.slice(1));
  };

  const handleRemove = async (index: number) => {
    const target = images[index];

    // 서버 삭제
    if (typeof target === 'object' && 'id' in target) {
      const id = (target as { id: number }).id;
      await deletePreview(teamId, { imageIds: [id] });
    } else if (typeof target === 'string' && target === thumbnail) {
      await deleteThumbnail(teamId, { imageId: 0 });
    }

    const next = images.filter((_, i) => i !== index);
    setThumbnail(next[0] ?? undefined);
    setPreviews(next.slice(1));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    const next = [...images, ...files].slice(0, MAX_IMAGES);
    setThumbnail(next[0]);
    setPreviews(next.slice(1));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const getImageSrc = (data: File | string): string => (typeof data === 'string' ? data : URL.createObjectURL(data));

  const paddedImages = [...images];
  while (paddedImages.length < MAX_IMAGES) paddedImages.push('');

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
          {paddedImages.map((url, index) =>
            url ? (
              <div
                key={index}
                className="border-lightGray relative flex h-[120px] w-full items-center justify-center overflow-hidden rounded border text-xs text-gray-400"
              >
                <img
                  src={getImageSrc(url)}
                  alt={`image-${index}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {index === 0 && (
                  <span className="absolute bottom-1 left-1 rounded bg-green-100 px-2 py-0.5 text-xs text-green-600">
                    썸네일
                  </span>
                )}
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 rounded-full border border-gray-300 bg-white p-1"
                >
                  <FiX size={16} className="text-gray-600" />
                </button>
              </div>
            ) : (
              <div
                key={index}
                className="border-lightGray flex h-[120px] w-full items-center justify-center rounded border border-dashed text-title text-lightGray"
              ><AiFillPicture />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploaderSection;
