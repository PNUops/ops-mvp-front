import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const FullContainer = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-5xl flex-1 px-10 pt-5 pb-20 2xl:px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default FullContainer;
