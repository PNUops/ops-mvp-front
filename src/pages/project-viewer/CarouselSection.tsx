import { useState, useEffect, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMediaQuery } from '@react-hookz/web';
import { useToast } from 'hooks/useToast';
import { ThumbnailResult, getThumbnail } from 'apis/projectEditor';
import { getPreviewImages } from 'apis/projectViewer';
import { PreviewResult, PreviewImagesResponseDto } from 'types/DTO/projectViewerDto';

import Spinner from '@components/Spinner';
import DefaultImage from '@assets/basicThumbnail.jpg';

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

type DefaultMedia = { status: 'default'; url: string };
type MediaType = ThumbnailResult | PreviewResult | 'youtube' | DefaultMedia | null;

const MediaRenderer = ({
  currentMedia,
  embedUrl,
  imageLoaded,
  setImageLoaded,
  setLoadFailed,
  isEditor,
}: {
  currentMedia: MediaType;
  embedUrl: string | null;
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
  setLoadFailed: (failed: boolean) => void;
  isEditor: boolean;
}) => {
  if (currentMedia === 'youtube' && embedUrl) {
    return <iframe src={embedUrl} title="Youtube Iframe" allowFullScreen className="absolute inset-0 h-full w-full" />;
  }

  if (typeof currentMedia === 'object' && currentMedia?.status === 'default') {
    return (
      <img
        src={currentMedia.url}
        alt="기본 이미지"
        className="border-lightGray absolute inset-0 h-full w-full border object-cover"
      />
    );
  }

  const statusMessageMap: Record<string, { icon: React.ElementType; message: React.ReactNode; isError?: boolean }> = {
    THUMBNAIL_PROCESSING: {
      icon: CgSandClock,
      message: (
        <>
          서버에서 썸네일을 압축 중이에요
          <br />
          조금만 기다려주세요!
        </>
      ),
    },
    PREVIEW_PROCESSING: {
      icon: CgSandClock,
      message: (
        <>
          서버에서 프리뷰 이미지를 압축 중이에요
          <br />
          조금만 기다려주세요!
        </>
      ),
    },
    THUMBNAIL_ERR_404: {
      icon: CiNoWaitingSign,
      message: '썸네일 이미지가 아직 업로드되지 않았어요',
      isError: true,
    },
    PREVIEW_ERR_404: {
      icon: CiNoWaitingSign,
      message: '프리뷰 이미지가 아직 업로드되지 않았어요',
      isError: true,
    },
    THUMBNAIL_ERR_ETC: {
      icon: FaSadTear,
      message: '썸네일 로드 중 알 수 없는 오류가 발생했어요',
      isError: true,
    },
    PREVIEW_ERR_ETC: {
      icon: FaSadTear,
      message: '프리뷰 이미지 로드 중 알 수 없는 오류가 발생했어요',
      isError: true,
    },
  };

  if (typeof currentMedia === 'object' && currentMedia !== null) {
    if (currentMedia.status === 'success') {
      return (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-white">
              <Spinner />
            </div>
          )}
          <img
            src={currentMedia.url}
            alt="Project image"
            onLoad={() => setImageLoaded(true)}
            onError={() => setLoadFailed(true)}
            className={`border-lightGray absolute inset-0 h-full w-full border object-cover transition-opacity duration-200 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      );
    } else if (currentMedia.status === 'processing') {
      const messageData = statusMessageMap[currentMedia.code];
      return messageData ? <ErrorMessage icon={messageData.icon} message={messageData.message} /> : null;
    } else if (currentMedia.status === 'error') {
      const messageData = statusMessageMap[currentMedia.code];
      return messageData ? <ErrorMessage icon={messageData.icon} message={messageData.message} /> : null;
    }
  }
  return <ErrorMessage icon={FaSadTear} message="이미지를 찾을 수 없거나 올바르지 않아요" />;
};

const CarouselSection = ({ teamId, previewIds, youtubeUrl, isEditor }: CarouselSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const isMobile = useMediaQuery('(max-width:640px)');

  const toast = useToast();
  const thumbnailNotFoundToast = useRef(false);

  const { data: thumbnailResult } = useQuery<ThumbnailResult>({
    queryKey: ['thumbnail', teamId],
    queryFn: () => getThumbnail(teamId),
    refetchInterval: (query) => (query.state.data?.status === 'processing' ? 1500 : false),
  });

  const stablePreviewIds = useMemo(() => [...previewIds], [previewIds]);
  const { data: previewData } = useQuery<PreviewImagesResponseDto>({
    queryKey: ['previewImages', teamId, stablePreviewIds],
    queryFn: () => getPreviewImages(teamId, stablePreviewIds),
    enabled: previewIds.length > 0,
    refetchInterval: (query) => {
      const data = query.state.data;
      const shouldRefetch = data?.imageResults?.every((result) => result.status === 'processing') ?? false;
      return shouldRefetch ? 1500 : false;
    },
  });

  useEffect(() => {
    if (thumbnailResult?.status === 'error' && thumbnailResult.code === 'THUMBNAIL_NOTFOUND') {
      if (!thumbnailNotFoundToast.current) {
        if (isEditor) {
          toast('썸네일 이미지를 올려주세요', 'info');
        }
        thumbnailNotFoundToast.current = true;
      }
    } else {
      thumbnailNotFoundToast.current = false;
    }
  }, [thumbnailResult, isEditor, toast]);

  const embedUrl = useMemo(() => getEmbedUrl(youtubeUrl), [youtubeUrl]);
  const rawImages = useMemo(() => {
    const images: MediaType[] = [];
    if (embedUrl) {
      images.push('youtube');
    }
    if (thumbnailResult) {
      images.push(thumbnailResult);
    }
    if (previewData?.imageResults) {
      images.push(...previewData.imageResults);
    }

    const hasValidMedia = images.some(
      (media) => media === 'youtube' || (typeof media === 'object' && media?.status === 'success'),
    );

    if (!hasValidMedia) images.push({ status: 'default', url: DefaultImage });

    return images;
  }, [embedUrl, thumbnailResult, previewData]);

  const visibleImages = useMemo(() => {
    return rawImages.filter((media): media is MediaType => {
      if (media === 'youtube') return true;
      if (media && typeof media === 'object') {
        if (media.status === 'success' || media.status === 'processing') return true;
        if (media.status === 'error') {
          return 'code' in media && (media.code === 'THUMBNAIL_ERR_ETC' || media.code === 'PREVIEW_ERR_ETC');
        }
        if (media.status === 'default') return true;
      }
      return false;
    });
  }, [rawImages]);

  const currentMedia = useMemo(() => visibleImages[currentIndex] || null, [visibleImages, currentIndex]);

  useEffect(() => {
    setImageLoaded(false);
    setLoadFailed(false);
  }, [currentMedia]);

  useEffect(() => {
    return () => {
      if (thumbnailResult?.status === 'success' && thumbnailResult.url?.startsWith('blob:')) {
        URL.revokeObjectURL(thumbnailResult.url);
      }
    };
  }, [thumbnailResult]);

  const goToPrev = () => setCurrentIndex((prev) => (prev === 0 ? visibleImages.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev === visibleImages.length - 1 ? 0 : prev + 1));
  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center md:gap-10">
        {visibleImages.length > 1 && !isMobile && <ArrowButton direction="left" onClick={goToPrev} />}

        <div className="border-lightGray relative aspect-[3/2] w-[50vw] max-w-[900px] min-w-sm overflow-hidden rounded">
          <MediaRenderer
            currentMedia={currentMedia}
            embedUrl={embedUrl}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
            setLoadFailed={setLoadFailed}
            isEditor={isEditor}
          />
        </div>

        {visibleImages.length > 1 && !isMobile && <ArrowButton direction="right" onClick={goToNext} />}
      </div>

      {visibleImages.length > 1 && (
        <div
          className={`mt-4 flex items-center ${!isMobile ? 'justify-center' : 'justify-between'} w-[50vw] max-w-[900px] min-w-sm px-3`}
        >
          {isMobile && <ArrowButton direction="left" onClick={goToPrev} size={40} />}

          <div className="flex gap-5">
            <IndicatorDots count={visibleImages.length} currentIndex={currentIndex} onClick={goToSlide} />
          </div>

          {isMobile && <ArrowButton direction="right" onClick={goToNext} size={40} />}
        </div>
      )}
    </div>
  );
};

export default CarouselSection;
