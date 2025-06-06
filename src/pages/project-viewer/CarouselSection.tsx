import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPreviewImages } from 'apis/projectViewer';
import { PreviewImagesResponseDto } from 'types/DTO/projectViewerDto';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface CarouselSectionProps {
  teamId: number;
  previewIds: number[];
}

const CarouselSection = ({ teamId, previewIds }: CarouselSectionProps) => {
  const { data, isLoading, error } = useQuery<PreviewImagesResponseDto>({
    queryKey: ['previewImages', teamId, previewIds],
    queryFn: () => getPreviewImages(teamId, previewIds),
    enabled: previewIds.length > 0,
    staleTime: 1000 * 60,
  });
  const imageUrls = data?.imageUrls ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? previewIds.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === previewIds.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex items-center justify-center gap-10 px-15">
      <button onClick={goToPrev}>
        <FaChevronLeft
          size={50}
          className="text-midGray hover:text-mainGreen rounded-full p-2 hover:cursor-pointer hover:bg-[#D1F3E1]"
        />
      </button>
      <div className="flex w-full flex-col items-center">
        <div className="border-midGray relative aspect-[3/2] w-full max-w-[80vh] overflow-hidden rounded border">
          <img
            src={imageUrls[currentIndex]}
            alt="Project image"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="mt-4 flex w-full max-w-[80vh] justify-center gap-3 px-3">
          {imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`hover:bg-[#D1F3E1] rounded-full h-1 flex-1 transition-all duration-200 hover:cursor-pointer ${
                currentIndex === index ? 'bg-mainGreen' : 'bg-lightGray'
              }`}
            />
          ))}
        </div>
      </div>
      <button onClick={goToNext}>
        <FaChevronRight
          size={50}
          className="text-midGray hover:text-mainGreen rounded-full p-2 hover:cursor-pointer hover:bg-[#D1F3E1]"
        />
      </button>
    </div>
  );
};

export default CarouselSection;
