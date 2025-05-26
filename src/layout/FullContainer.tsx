import React from 'react';
import { Outlet } from 'react-router-dom';

const FullContainer = () => {
  return (
    <div className="flex min-h-screen w-full justify-center pt-10 sm:pt-16">
      <div className="mt-header mb-20 w-full max-w-[1448px] px-2 2xl:px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default FullContainer;
