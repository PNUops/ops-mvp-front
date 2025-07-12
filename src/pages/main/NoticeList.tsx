import { AiOutlineNotification } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { NoticeResponseDto } from 'types/DTO/notices/NoticeResponseDto';
import { MdFiberNew } from "react-icons/md";
import dayjs from 'dayjs';

interface Props {
  notices: NoticeResponseDto[];
}

const isNew = (updatedAt: string) => {
  const withoutWeekday = updatedAt.replace(/(월|화|수|목|금|토|일)요일/, '');

  const cleaned = withoutWeekday
    .replace('년', '')
    .replace('월', '')
    .replace('일', '')
    .trim();

  const normalized = cleaned.replace(/\s+/g, ' ');

  const parsed = dayjs(normalized, 'YYYY MM DD HH:mm');
  const now = dayjs();
  const diffInDays = now.diff(parsed, 'day');

  return diffInDays <= 3;
}

const NoticeList = ({ notices }: Props) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <ul>
        {notices && notices.length === 0 && (
          <li className="text-midGray py-2 text-center text-sm">등록된 공지사항이 없습니다.</li>
        )}
        {notices?.map((notice) => {
          const showNewIcon = isNew(notice.updatedAt);

          return (
            <li
              key={notice.noticeId}
              className="hover:bg-lightGray flex items-center justify-between rounded px-2 py-1 transition"
            >
              <AiOutlineNotification className="mr-2" />
              <div className="flex flex-1 items-center gap-1 truncate ">
                <Link to={`/notices/${notice.noticeId}`} className="text-[clamp(0.75rem,2vw,1rem)] truncate">
                  {notice.title}
                </Link>
                {showNewIcon && (
                  <MdFiberNew className="text-mainRed shrink-0 text-[clamp(1rem,2vw,1.5rem)] " />
                )}
              </div>

              <span className="ml-2 text-midGray truncate text-right text-xs">{notice.updatedAt}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NoticeList;
