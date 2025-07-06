import { AiOutlineNotification } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNotices } from '../../apis/notices';

const NoticeList = () => {
  const { data: notices } = useQuery<{ noticeId: number; title: string; updatedAt: string }[]>({
    queryKey: ['notices'],
    queryFn: getNotices,
  });

  return(
    <div className="bg-white rounded-lg shadow p-4">
      <ul>
        {notices && notices.length === 0 && (
          <li className="text-midGray text-sm text-center py-2">
            등록된 공지사항이 없습니다.
          </li>
        )}
        {notices?.map((notice) => (
          <li key={notice.noticeId}
              className="flex items-center justify-between hover:bg-lightGray rounded px-2 py-1 transition">
            <AiOutlineNotification className="mr-2" />
            <Link to={`/notices/${notice.noticeId}`} className="flex-1 truncate">
              {notice.title}
            </Link>

            <span className="text-right text-xs text-midGray truncate">{notice.updatedAt}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NoticeList;