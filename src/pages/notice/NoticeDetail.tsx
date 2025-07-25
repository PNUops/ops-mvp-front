import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNoticeDetail } from 'apis/notices';
import { AiOutlineNotification } from 'react-icons/ai';
import { useEffect } from 'react';
import NoticeDetailSkeleton from './NoticeDetailSkeleton';
import dayjs from 'dayjs';

const NoticeDetail = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    const { noticeId } = useParams();
    const {
        data: notice,
        isLoading,
        isError,
    } = useQuery({
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
            <h1 className="mb-6 text-2xl font-bold">공지사항</h1>
            <div className="bg-whiteGray mb-2 flex items-center rounded px-4 py-5">
                <AiOutlineNotification className="mr-4" />
                <span className="flex-1 text-[clamp(0.85rem,2vw,1.3rem)] font-bold">{notice.title}</span>
            </div>

            <div className="flex justify-end">
                <div className="flex px-2">
                    <div className="px-2 text-midGray text-[clamp(0.75rem,1.5vw,1rem)]">작성일</div>
                    <div className=" mb-6 text-midGray text-right text-[clamp(0.75rem,1.5vw,1rem)] font-semibold">
                        {dayjs(notice.createdAt).format('YYYY.MM.DD')}
                    </div>
                </div>

                <div className="px-1 text-midGray text-[clamp(0.75rem,1.5vw,1rem)] font-bold"> |</div>

                <div className="flex">
                    <div className="px-2 text-midGray text-[clamp(0.75rem,1.5vw,1rem)]">수정일</div>
                    <div className=" mb-6 text-midGray text-right text-[clamp(0.75rem,1.5vw,1rem)] font-semibold">
                        {dayjs(notice.updatedAt).format('YYYY.MM.DD')}
                    </div>
                </div>
            </div>


            <div className="bg-subGreen rounded p-6 text-[clamp(0.75rem,2vw,1rem)] leading-relaxed whitespace-pre-line">
                {notice.description}
            </div>
        </div>
    );
};

export default NoticeDetail;
