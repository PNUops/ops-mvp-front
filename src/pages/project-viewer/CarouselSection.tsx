import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSwipeable } from 'react-swipeable';
import { getThumbnail } from 'apis/projectEditor';
import { getPreviewImages } from 'apis/projectViewer';
import { PreviewImagesResponseDto } from 'types/DTO/projectViewerDto';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { AiFillPicture } from 'react-icons/ai';

interface CarouselSectionProps {
  teamId: number;
  previewIds: number[];
  youtubeUrl: string;
}

const CarouselSection = ({ teamId, previewIds, youtubeUrl }: CarouselSectionProps) => {
  // TODO: 화살표 반응형 처리 구현
  const {
    data: thumbnailUrl,
    isLoading: isThumbnailLoading,
    error: thumbnailError,
  } = useQuery<string>({
    queryKey: ['thumbnail', teamId],
    queryFn: () => getThumbnail(teamId),
    // staleTime: 1000 * 60,
  });

  const {
    data: previewData,
    isLoading: isPreviewLoading,
    error: previewError,
  } = useQuery<PreviewImagesResponseDto>({
    queryKey: ['previewImages', teamId, previewIds],
    queryFn: () => getPreviewImages(teamId, previewIds),
    enabled: previewIds.length > 0,
    // staleTime: 1000 * 60,
  });

  const previewUrls = previewData?.imageUrls ?? [];
  const imageUrls = [...(!!youtubeUrl ? ['youtube'] : []), ...(thumbnailUrl ? [thumbnailUrl] : []), ...previewUrls];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showGuide, setShowGuide] = useState(false);

  const currentImage = imageUrls[currentIndex] || null;

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrev(),
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 640) {
      setShowGuide(true);
      const timer = setTimeout(() => setShowGuide(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowGuide(false);
    }
  }, [windowWidth]);

  return (
    <div {...handlers}>
      {showGuide && (
        <div className="text-lightGray animate-fadeInUp my-2 text-center text-xs duration-300 ease-out select-none">
          모바일일 경우 스와이프 해보세요.
        </div>
      )}
      <div className="flex items-center justify-center md:gap-10">
        {imageUrls.length > 1 && (
          <button onClick={goToPrev} className="focus:outline-none">
            <FaChevronLeft
              size={50}
              className="text-lightGray hover:text-mainGreen hidden rounded-full p-2 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-[#D1F3E1]/25 sm:block"
            />
          </button>
        )}
        <div className="flex flex-col items-center gap-2">
          <div className="border-lightGray relative aspect-[3/2] w-[50vw] max-w-[900px] min-w-[300px] overflow-hidden rounded border">
            {!currentImage || loadFailed ? (
              <div className="text-midGray flex h-full w-full items-center justify-center">
                <AiFillPicture size={40} />
              </div>
            ) : (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-white">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#D1F3E1] border-t-transparent" />
                  </div>
                )}
                <img
                  src={currentImage}
                  alt="Project image"
                  onLoad={() => {
                    setImageLoaded(true);
                  }}
                  onError={() => {
                    setLoadFailed(true);
                  }}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </>
            )}
          </div>
          {imageUrls.length > 1 && (
            <div className="mt-4 flex w-full max-w-lg justify-center gap-5 px-3 sm:max-w-xl md:max-w-2xl">
              {imageUrls.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-200 hover:cursor-pointer hover:bg-[#D1F3E1] ${
                    currentIndex === index ? 'bg-mainGreen' : 'bg-lightGray'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {imageUrls.length > 1 && (
          <button onClick={goToNext} className="focus:outline-none">
            <FaChevronRight
              size={50}
              className="text-lightGray hover:text-mainGreen hidden rounded-full p-2 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-[#D1F3E1]/25 sm:block"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default CarouselSection;
