import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNoticeDetail } from 'apis/notices';
import { AiOutlineNotification } from "react-icons/ai";
import { useEffect } from 'react';
import NoticeDetailSkeleton from './NoticeDetailSkeleton';

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

  if (isLoading) return <NoticeDetailSkeleton />;
  if (isError || !notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }


  return (
  <div className="max-w mx-auto">
      <h1 className="text-2xl font-bold mb-6">공지사항</h1>
      <div className="flex items-center bg-whiteGray rounded px-4 py-5 mb-2">
        <AiOutlineNotification className="mr-4" />
        <span className="font-bold text-[clamp(0.85rem,2vw,1.3rem)] flex-1">{notice.title}</span>
      </div>
      <div className="text-[clamp(0.7rem,1.5vw,0.9rem)] text-right text-midGray mb-6">{notice.updatedAt}</div>
      <div className="text-[clamp(0.75rem,2vw,1rem)] bg-subGreen rounded p-6 leading-relaxed whitespace-pre-line">
        {notice.description}
      </div>
    </div>
  );
};

export default NoticeDetail;