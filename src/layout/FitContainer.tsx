import React from 'react';
import { Outlet } from 'react-router-dom';

const FitContainer = () => {
  return (
    <div className="flex min-h-screen w-full justify-center p-20 sm:pt-16">
      <div className="max-w-container mb-20 w-full 2xl:px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default FitContainer;
