import { AiOutlineNotification } from 'react-icons/ai';

const NoticeListSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 animate-pulse">
      <ul className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-20 ml-4"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoticeListSkeleton;