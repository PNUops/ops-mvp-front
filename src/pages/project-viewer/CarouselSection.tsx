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
import { CiNoWaitingSign } from 'react-icons/ci';

interface CarouselSectionProps {
  teamId: number;
  previewIds: number[];
  youtubeUrl: string;
  isEditor: boolean;
}

const ERROR_CODES = ['ERROR_ETC', 'THUMBNAIL_ERR_404', 'PREVIEW_ERR_404', 'THUMBNAIL_ERR_409', 'PREVIEW_ERR_409'];

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

const ErrorMessage = ({ icon: Icon, message }: { icon: React.ElementType; message: React.ReactNode }) => (
  <div className="text-lightGray border-lightGray flex h-full w-full animate-pulse flex-col items-center justify-center gap-5 border">
    <Icon size={40} />
    <span className="text-center text-xs">{message}</span>
  </div>
);

const MediaRenderer = ({
  currentImage,
  embedUrl,
  imageLoaded,
  setImageLoaded,
  setLoadFailed,
  isEditor,
}: {
  currentImage: string | null;
  embedUrl: string | null;
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
  setLoadFailed: (failed: boolean) => void;
  isEditor: boolean;
}) => {
  if (currentImage === 'youtube' && embedUrl) {
    return <iframe src={embedUrl} title="Youtube Iframe" allowFullScreen className="absolute inset-0 h-full w-full" />;
  }

  const errorMap: Record<string, { icon: React.ElementType; message: React.ReactNode }> = {
    ERROR_ETC: {
      icon: FaSadTear,
      message: '이미지를 찾을 수 없어요',
    },
    THUMBNAIL_ERR_404: {
      icon: CiNoWaitingSign,
      message: '썸네일이 아직 업로드 되지 않았어요',
    },
    PREVIEW_ERR_404: {
      icon: CiNoWaitingSign,
      message: '프리뷰 이미지가 아직 업로드 되지 않았어요',
    },
    THUMBNAIL_ERR_409: {
      icon: CgSandClock,
      message: (
        <>
          서버에서 이미지를 압축 중이에요
          <br />
          조금만 기다려주세요!
        </>
      ),
    },
    PREVIEW_ERR_409: {
      icon: CgSandClock,
      message: (
        <>
          서버에서 이미지를 압축 중이에요
          <br />
          조금만 기다려주세요!
        </>
      ),
    },
  };

  if (!currentImage || ERROR_CODES.includes(currentImage)) {
    if (!isEditor) return null;
    const { icon, message } = currentImage ? errorMap[currentImage] : errorMap['ERROR_ETC'];
    return <ErrorMessage icon={icon} message={message} />;
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

const CarouselSection = ({ teamId, previewIds, youtubeUrl, isEditor }: CarouselSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const isMobile = useMediaQuery('(max-width:640px)');

  const { data: thumbnailUrl } = useQuery<string>({
    queryKey: ['thumbnail', teamId],
    queryFn: () => getThumbnail(teamId),
    refetchInterval: (query) => (query.state.data === 'ERROR_409' ? 1500 : false),
  });

  const { data: previewData } = useQuery<PreviewImagesResponseDto>({
    queryKey: ['previewImages', teamId],
    queryFn: () => getPreviewImages(teamId, previewIds),
    enabled: previewIds.length > 0,
    refetchInterval: (query) => {
      const data = query.state.data;
      const shouldRefetch = data?.imageUrls?.every((url) => url === 'ERROR_409') ?? false;
      return shouldRefetch ? 1500 : false;
    },
  });

  const previewUrls = previewData?.imageUrls ?? [];
  const embedUrl = useMemo(() => getEmbedUrl(youtubeUrl), [youtubeUrl]);
  const rawImageUrls = useMemo(() => {
    return [...(embedUrl ? ['youtube'] : []), ...(thumbnailUrl ? [thumbnailUrl] : []), ...previewUrls];
  }, [embedUrl, thumbnailUrl, previewUrls]);

  const visibleImageUrls = useMemo(() => {
    return isEditor ? rawImageUrls : rawImageUrls.filter((url) => !ERROR_CODES.includes(url));
  }, [rawImageUrls, isEditor]);

  const currentImage = useMemo(() => visibleImageUrls[currentIndex] || null, [visibleImageUrls, currentIndex]);

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

  const goToPrev = () => setCurrentIndex((prev) => (prev === 0 ? visibleImageUrls.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev === visibleImageUrls.length - 1 ? 0 : prev + 1));
  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center md:gap-10">
        {visibleImageUrls.length > 1 && !isMobile && <ArrowButton direction="left" onClick={goToPrev} />}

        <div className="border-lightGray relative aspect-[3/2] w-[50vw] max-w-[900px] min-w-[300px] overflow-hidden rounded">
          <MediaRenderer
            currentImage={currentImage}
            embedUrl={embedUrl}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
            setLoadFailed={setLoadFailed}
            isEditor={isEditor}
          />
        </div>

        {visibleImageUrls.length > 1 && !isMobile && <ArrowButton direction="right" onClick={goToNext} />}
      </div>

      {visibleImageUrls.length > 1 && (
        <div
          className={`mt-4 flex items-center ${!isMobile ? 'justify-center' : 'justify-between'} w-[50vw] max-w-[900px] min-w-[300px] px-3`}
        >
          {isMobile && <ArrowButton direction="left" onClick={goToPrev} size={40} />}

          <div className="flex gap-5">
            <IndicatorDots count={visibleImageUrls.length} currentIndex={currentIndex} onClick={goToSlide} />
          </div>

          {isMobile && <ArrowButton direction="right" onClick={goToNext} size={40} />}
        </div>
      )}
    </div>
  );
};

export default CarouselSection;
