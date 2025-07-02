import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNoticeDetail } from 'apis/notices';
import { AiFillNotification } from "react-icons/ai";
import { useEffect } from 'react';

const NoticeDetail = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const { noticeId } = useParams();
  const { data: notice, isLoading, isError } = useQuery({
    queryKey: ['noticeDetail', noticeId],
    queryFn: () => getNoticeDetail(Number(noticeId)),
    enabled: !!noticeId,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !notice) {
    return (
      // <div>공지사항을 찾을 수 없습니다.</div>
      <div className="max-w-full mx-auto mt-10 px-4">
        <h1 className="text-xl font-bold mb-6">공지사항</h1>
        <div className="flex items-center bg-whiteGray rounded px-4 py-3 mb-2">
          <AiFillNotification className="mr-4" />
          <span className="font-semibold text-base flex-1">공지사항 제목</span>
        </div>
        
        <div className="bg-lightGreen rounded p-6 leading-relaxed whitespace-pre-line">
          공지사항입니다
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">공지사항</h1>
      <div className="flex items-center bg-whiteGray rounded px-4 py-3 mb-2">
        <AiFillNotification className="mr-4" />
        <span className="font-semibold text-base flex-1">{notice.title}</span>
      </div>
      <div className="text-right text-midGray text-sm mb-6">
        {new Date(notice.updatedAt).toLocaleString('ko-KR', {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit', weekday: 'long'
        })}
      </div>
      <div className="bg-lightGreen rounded p-6 leading-relaxed whitespace-pre-line">
        {notice.description}
      </div>
    </div>
  );
};

export default NoticeDetail;