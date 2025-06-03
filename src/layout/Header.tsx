import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="h-header z-20 flex w-full items-center justify-between px-6">
      <Link to="/">
        <img className="h-10 w-auto" src="/Logo.png" alt="부산대학교 SW성과관리시스템 로고" />
      </Link>
      <button className="text-exsm border-lightGray rounded-full border px-4 py-2">로그아웃</button>
    </header>
  );
};

export default Header;
