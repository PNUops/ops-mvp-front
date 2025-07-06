const NoticeDetailSkeleton = () => {
  return (
    <div className="max-w mx-auto animate-pulse">
      <div className="h-8 bg-midGray rounded w-32 mb-6"></div>
      <div className="flex items-center bg-whiteGray rounded px-4 py-5 mb-2">
        <div className="flex-1">
          <div className="h-5 bg-midgray rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-midGray rounded w-1/2"></div>
        </div>
      </div>

      <div className="text-right mb-6">
        <div className="h-4 bg-midGray rounded w-40 inline-block"></div>
      </div>

      <div className="bg-subGreen rounded p-6">
        <div className="space-y-3">
          <div className="h-4 bg-midGray rounded w-full"></div>
          <div className="h-4 bg-midGray rounded w-5/6"></div>
          <div className="h-4 bg-midGray rounded w-4/5"></div>
          <div className="h-4 bg-midGray rounded w-full"></div>
          <div className="h-4 bg-midGray rounded w-3/4"></div>
          <div className="h-4 bg-midGray rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailSkeleton;
