import React from 'react';
import { Outlet } from 'react-router-dom';

const FitContainer = () => {
  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="max-w-container w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default FitContainer;
