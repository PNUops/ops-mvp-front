import { useState } from 'react';

import { team_images as images } from '@mocks/data/viewer';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex items-center justify-center gap-10 px-15">
      <button onClick={goToPrev}>
        <FaChevronLeft size={35} className="text-midGray hover:text-mainGreen" />
      </button>

      <div className="flex flex-col">
        <div className="border-midGray relative aspect-[3/2] max-h-[400px] w-full overflow-hidden rounded border">
          <img src={images[currentIndex].imageId} alt="Project image" className="h-full w-full object-cover" />
        </div>
        <div className="mt-4 flex justify-center gap-3 px-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 w-full rounded-full ${currentIndex === index ? 'bg-mainGreen' : 'bg-lightGray'}`}
            />
          ))}
        </div>
      </div>
      <button onClick={goToNext}>
        <FaChevronRight size={35} className="text-midGray hover:text-mainGreen" />
      </button>
    </div>
  );
};

export default Carousel;
