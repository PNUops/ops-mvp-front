import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMediaQuery } from '@react-hookz/web';

import { getThumbnail } from 'apis/projectEditor';
import { getPreviewImages } from 'apis/projectViewer';
import { PreviewImagesResponseDto } from 'types/DTO/projectViewerDto';

import Spinner from '@components/Spinner';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { FaSadTear } from 'react-icons/fa';
import { CgSandClock } from 'react-icons/cg';

interface CarouselSectionProps {
  teamId: number;
  previewIds: number[];
  youtubeUrl: string;
}

const getEmbedUrl = (url: string) => {
  try {
    let fixedUrl = url.replace('m.youtube.com', 'www.youtube.com');
    const urlObj = new URL(fixedUrl);

    let videoId = urlObj.searchParams.get('v');

    if (!videoId) {
      if (urlObj.hostname === 'youtu.be') {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.pathname.startsWith('/embed/')) {
        videoId = urlObj.pathname.split('/embed/')[1];
      }
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
};

const ArrowButton = ({
  direction,
  onClick,
  size = 50,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  size?: number;
}) => {
  const Icon = direction === 'left' ? FaChevronLeft : FaChevronRight;
  return (
    <button onClick={onClick} className="focus:outline-none">
      <Icon
        size={size}
        className="text-lightGray hover:text-mainGreen rounded-full p-2 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-[#D1F3E1]/25"
      />
    </button>
  );
};

const IndicatorDots = ({
  count,
  currentIndex,
  onClick,
}: {
  count: number;
  currentIndex: number;
  onClick: (i: number) => void;
}) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <button
        key={index}
        onClick={() => onClick(index)}
        className={`h-2 w-2 rounded-full transition-all duration-200 hover:cursor-pointer hover:bg-[#D1F3E1] ${
          currentIndex === index ? 'bg-mainGreen' : 'bg-lightGray'
        }`}
      />
    ))}
  </>
);

const MediaRenderer = ({
  currentImage,
  embedUrl,
  imageLoaded,
  setImageLoaded,
  setLoadFailed,
}: {
  currentImage: string | null;
  embedUrl: string | null;
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
  setLoadFailed: (failed: boolean) => void;
}) => {
  if (!currentImage || currentImage === 'ERROR') {
    return (
      <div className="text-lightGray border-lightGray flex h-full w-full flex-col items-center justify-center gap-5 border">
        <FaSadTear size={40} />
        <span className="text-xs">이미지를 찾을 수 없어요.</span>
      </div>
    );
  }

  if (currentImage === 'youtube' && embedUrl) {
    return <iframe src={embedUrl} title="Youtube Iframe" allowFullScreen className="absolute inset-0 h-full w-full" />;
  }

  if (currentImage === 'ERROR_409') {
    return (
      <div className="text-lightGray border-lightGray flex h-full w-full flex-col items-center justify-center gap-5 border">
        <CgSandClock size={40} />
        <span className="text-xs">서버에서 이미지 변환 중입니다. 나중에 시도해 주세요.</span>
      </div>
    );
  }

  return (
    <>
      {!imageLoaded && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-white">
          <Spinner />
        </div>
      )}
      <img
        src={currentImage}
        alt="Project image"
        onLoad={() => setImageLoaded(true)}
        onError={() => setLoadFailed(true)}
        className={`border-lightGray absolute inset-0 h-full w-full border object-cover object-top transition-opacity duration-200 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
};

const CarouselSection = ({ teamId, previewIds, youtubeUrl }: CarouselSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const isMobile = useMediaQuery('(max-width:640px)');

  const { data: thumbnailUrl } = useQuery<string>({
    queryKey: ['thumbnail', teamId],
    queryFn: () => getThumbnail(teamId),
  });

  const { data: previewData } = useQuery<PreviewImagesResponseDto>({
    queryKey: ['previewImages', teamId, previewIds],
    queryFn: () => getPreviewImages(teamId, previewIds),
    enabled: previewIds.length > 0,
  });

  const previewUrls = previewData?.imageUrls ?? [];
  const embedUrl = useMemo(() => getEmbedUrl(youtubeUrl), [youtubeUrl]);
  const imageUrls: string[] = useMemo(() => {
    const result = [...(embedUrl ? ['youtube'] : []), ...(thumbnailUrl ? [thumbnailUrl] : []), ...previewUrls];
    return result;
  }, [embedUrl, thumbnailUrl, previewUrls]);

  const currentImage = useMemo(() => imageUrls[currentIndex] || null, [imageUrls, currentIndex]);

  useEffect(() => {
    setImageLoaded(false);
    setLoadFailed(false);
  }, [currentImage]);

  useEffect(() => {
    return () => {
      if (thumbnailUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailUrl]);

  const goToPrev = () => setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center md:gap-10">
        {imageUrls.length > 1 && !isMobile && <ArrowButton direction="left" onClick={goToPrev} />}

        <div className="border-lightGray relative aspect-[3/2] w-[50vw] max-w-[900px] min-w-[300px] overflow-hidden rounded">
          <MediaRenderer
            currentImage={currentImage}
            embedUrl={embedUrl}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
            setLoadFailed={setLoadFailed}
          />
        </div>

        {imageUrls.length > 1 && !isMobile && <ArrowButton direction="right" onClick={goToNext} />}
      </div>

      {imageUrls.length > 1 && (
        <div
          className={`mt-4 flex items-center ${!isMobile ? 'justify-center' : 'justify-between'} w-[50vw] max-w-[900px] min-w-[300px] px-3`}
        >
          {isMobile && <ArrowButton direction="left" onClick={goToPrev} size={40} />}

          <div className="flex gap-5">
            <IndicatorDots count={imageUrls.length} currentIndex={currentIndex} onClick={goToSlide} />
          </div>

          {isMobile && <ArrowButton direction="right" onClick={goToNext} size={40} />}
        </div>
      )}
    </div>
  );
};

export default CarouselSection;
