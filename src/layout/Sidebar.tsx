import useContests from 'hooks/useContests';
import { Link, useParams } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-sidebar min-w-sidebar border-lightGray z-10 hidden border-r border-b bg-white lg:block">
      <SidebarHistoryMenu />
    </div>
  );
};

const SidebarHistoryMenu = () => {
  const { data } = useContests();
  const { contestId } = useParams();

  return (
    <div className="w-full">
      {data && (
        <ul className="divide-lightGray divide-y">
          {data?.map((item) => {
            const isActive = contestId === item.contestId.toString();
            return (
              <li key={item.contestId}>
                <Link
                  to={`/contest/${item.contestId}`}
                  className={`block truncate p-3 px-5 text-base text-nowrap transition-colors duration-200 ease-in ${
                    isActive ? 'bg-mainGreen text-white' : 'hover:text-mainGreen hover:bg-whiteGray'
                  }`}
                >
                  {item.contestName}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
