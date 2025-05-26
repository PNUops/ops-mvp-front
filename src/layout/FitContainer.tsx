import React from 'react';
import { Outlet } from 'react-router-dom';

const FitContainer = () => {
  return (
    <div className="flex min-h-screen w-full justify-center pt-10 sm:pt-16">
      <div className="mb-20 w-full max-w-[1448px] 2xl:px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default FitContainer;
