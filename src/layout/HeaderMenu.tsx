import { useQuery } from '@tanstack/react-query';
import { getAllContests } from 'apis/contests';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderMenu = () => {
  return (
    <div className="flex-1 font-semibold md:text-lg lg:text-xl">
      <HistoryMenu />
    </div>
  );
};
export default HeaderMenu;

const HistoryMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery({ queryKey: ['contests'], queryFn: getAllContests });

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <Link to="/contest" className="hover:text-mainGreen cursor-pointer">
        히스토리
      </Link>
      {isOpen && data && (
        <div className="border-subGreen absolute top-full z-50 w-fit border-2 bg-white text-nowrap">
          <ul className="text-base font-normal">
            {data?.map((item) => (
              <Link
                to={`/contest/${item.contestId}`}
                className="hover:text-mainGreen block cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {item.contestName}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
