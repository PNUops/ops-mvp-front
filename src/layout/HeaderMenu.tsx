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
      <Link to="/contest" className="hover:text-mainGreen block p-4 text-nowrap">
        히스토리
      </Link>
      {isOpen && data && (
        <ul className="border-subGreen absolute z-50 w-fit border-2 bg-white text-base font-normal text-nowrap">
          {data?.map((item) => (
            <li key={item.contestId}>
              <Link
                to={`/contest/${item.contestId}`}
                className="hover:text-mainGreen hover:bg-whiteGray block p-4 transition-colors duration-200 ease-in"
              >
                {item.contestName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
