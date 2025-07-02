import banner from '@assets/banner.svg';
import useContestStore from 'stores/useContestStore';
import { useQuery } from '@tanstack/react-query';
import { getAllContests } from 'apis/contests';
import { getNotices } from '../../apis/notices';
import { Link } from 'react-router-dom';
import { AiFillNotification } from "react-icons/ai";

const Notice = () => {
  const { selectedContestId } = useContestStore();
  const { data: contests } = useQuery({ queryKey: ['contests'], queryFn: getAllContests });
  const { data: notices } = useQuery<{ noticeId: number; title: string; updatedAt: string }[]>({
    queryKey: ['notices'],
    queryFn: getNotices,
  });

  const selectedContest = contests?.find(contest => contest.contestId === selectedContestId);

  const BANNER_URL =
    'https://swedu.pusan.ac.kr/swedu/31630/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGc3dlZHUlMkY2OTA2JTJGMTcxNjIwOCUyRmFydGNsVmlldy5kbyUzRmJic09wZW5XcmRTZXElM0QlMjZpc1ZpZXdNaW5lJTNEZmFsc2UlMjZzcmNoQ29sdW1uJTNEc2olMjZwYWdlJTNEMSUyNnNyY2hXcmQlM0QlMjVFQyUyNUIwJTI1QkQlMjVFQyUyNTlEJTI1OTglMjVFQyUyNTlDJTI1QjUlMjVFRCUyNTk1JTI1QTklMjZyZ3NCZ25kZVN0ciUzRCUyNmJic0NsU2VxJTNEJTI2cGFzc3dvcmQlM0QlMjZyZ3NFbmRkZVN0ciUzRCUyNg%3D%3D';
  return (
    <div className="flex flex-col gap-4">
      {selectedContest && (
        <div className="my-4 flex items-center justify-between">
          <h3 id="projects" className="lg:text-title text-2xl font-bold">
            {selectedContest.contestName}
          </h3>
        </div>
      )}
      <a href={BANNER_URL} target="_blank" className="flex min-h-25">
        <img src={banner} alt="대회 로고" className="flex cursor-pointer object-cover object-left" />
      </a>

      <div className="bg-white rounded-lg shadow p-4">
        <ul>
          {notices?.map((notice) => (
            <li key={notice.noticeId}
                className="flex items-center justify-between hover:bg-gray-100 rounded px-2 py-1 transition">
              <AiFillNotification className="mr-2"/>
              <Link to={`/notices/${notice.noticeId}`} className="flex-1 truncate">
                {notice.title}
              </Link>

              <span className="ml-4 text-xs text-gray-400">
                {new Date(notice.updatedAt).toLocaleString('ko-KR', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notice;
