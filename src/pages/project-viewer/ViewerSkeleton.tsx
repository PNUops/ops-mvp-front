export const IntroSectionSkeleton = () => (
  <div className="animate-pulse space-y-2 rounded-md bg-gray-100 p-4">
    <div className="h-6 w-3/4 rounded bg-gray-300"></div>
    <div className="h-4 w-1/2 rounded bg-gray-300"></div>
  </div>
);

export const CarouselSectionSkeleton = () => (
  <div className="flex w-full justify-center">
    <div className="aspect-[3/2] w-[50vw] max-w-[900px] min-w-[300px] animate-pulse rounded-md bg-gray-100"></div>
  </div>
);

export const LikeSectionSkeleton = () => (
  <div className="flex w-full justify-center">
    <div className="h-10 w-24 animate-pulse rounded bg-gray-300"></div>
  </div>
);

export const DetailSectionSkeleton = () => (
  <div className="animate-pulse space-y-4 rounded-md bg-gray-100 p-4">
    <div className="h-4 w-full rounded bg-gray-300"></div>
    <div className="h-4 w-5/6 rounded bg-gray-300"></div>
    <div className="h-4 w-3/4 rounded bg-gray-300"></div>
  </div>
);

export const MediaSectionSkeleton = () => (
  <div className="animate-pulse space-y-2 rounded-md bg-gray-100 p-4">
    <div className="h-6 w-32 rounded bg-gray-300"></div>
    <div className="h-6 w-32 rounded bg-gray-300"></div>
  </div>
);

export const CommentSectionSkeleton = () => (
  <div className="animate-pulse space-y-2 rounded-md bg-gray-100 p-4">
    <div className="h-6 w-full rounded bg-gray-300"></div>
    <div className="h-6 w-3/4 rounded bg-gray-300"></div>
    <div className="h-6 w-1/2 rounded bg-gray-300"></div>
  </div>
);
