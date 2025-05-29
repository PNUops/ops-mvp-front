import React from 'react';

const Header = () => {
  return (
    <header className="h-header z-20 flex w-full items-center justify-between">
      <div className="text-title w-sidebar text-center font-bold">PNU OPS</div>
      <button className="text-exsm border-lightGray mr-8 rounded-full border px-4 py-2">로그아웃</button>
    </header>
  );
};

export default Header;
