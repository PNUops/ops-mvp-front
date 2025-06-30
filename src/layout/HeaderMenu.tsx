import { useState } from 'react';

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

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <span className="hover:text-mainGreen cursor-pointer">히스토리</span>
      {isOpen && (
        <div className="border-subGreen absolute top-full z-50 w-fit border-2 bg-white text-nowrap">
          <ul className="text-base font-normal">
            <li className="hover:text-mainGreen cursor-pointer px-4 py-2 hover:bg-gray-100">
              제6회PNU창의융합SW해커톤
            </li>
            <li className="hover:text-mainGreen cursor-pointer px-4 py-2 hover:bg-gray-100">
              제5회PNU창의융합SW해커톤
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
