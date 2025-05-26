import React from 'react';
import { CiMenuFries } from 'react-icons/ci';

interface HeaderProps {
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setMobileSidebarOpen }: HeaderProps) => {
  const handleSidebarToggle = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  return (
    <header className="z-20 flex h-[104px] w-full items-center justify-between border-b">
      <div onClick={handleSidebarToggle} className="text-title w-[200px] text-center font-bold">
        PNU OPS
      </div>
      <button className="mr-4 rounded-full border px-4 py-1 text-sm">로그아웃</button>
    </header>
  );
};

export default Header;
