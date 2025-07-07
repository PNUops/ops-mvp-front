import { AiOutlineNotification } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { NoticeResponseDto } from 'types/DTO/notices/NoticeResponseDto';

interface Props {
  notices: NoticeResponseDto[];
}

const NoticeList = ({ notices }: Props) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <ul>
        {notices && notices.length === 0 && (
          <li className="text-midGray py-2 text-center text-sm">등록된 공지사항이 없습니다.</li>
        )}
        {notices?.map((notice) => (
          <li
            key={notice.noticeId}
            className="hover:bg-lightGray flex items-center justify-between rounded px-2 py-1 transition"
          >
            <AiOutlineNotification className="mr-2" />
            <Link to={`/notices/${notice.noticeId}`} className="flex-1 truncate">
              {notice.title}
            </Link>

            <span className="text-midGray truncate text-right text-xs">{notice.updatedAt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeList;
