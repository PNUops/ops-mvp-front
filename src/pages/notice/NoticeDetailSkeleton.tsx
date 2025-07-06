const NoticeDetailSkeleton = () => {
  return (
    <div className="max-w mx-auto">
      <h1 className="text-2xl font-bold mb-6">공지사항</h1>
      <div className="flex items-center bg-whiteGray rounded px-4 py-5 mb-2 animate-pulse">
        <div className="flex-1">
          <div className="h-5 bg-lightGray rounded w-3/4 mb-2"></div>
        </div>
      </div>

      <div className="text-right mb-6 animate-pulse">
        <div className="h-4 bg-lightGray rounded w-40 inline-block"></div>
      </div>

      <div className="bg-subGreen rounded p-6">
        <div className="space-y-3">
          <div className="h-4 bg-lightGray rounded w-1/2"></div>
          <div className="h-4 bg-lightGray rounded w-2/3"></div>
          <div className="h-4 bg-lightGray rounded w-4/5"></div>
          <div className="h-4 bg-lightGray rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailSkeleton;
