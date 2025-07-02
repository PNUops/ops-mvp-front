import banner from '@assets/banner.svg';
import useContestStore from 'stores/useContestStore';
import { useQuery } from '@tanstack/react-query';
import { getAllContests } from 'apis/contests';

const Notice = () => {
  const { selectedContestId } = useContestStore();
  const { data: contests } = useQuery({ queryKey: ['contests'], queryFn: getAllContests });

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
    </div>
  );
};

export default Notice;
