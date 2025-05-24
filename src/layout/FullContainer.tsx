import React from 'react';
import { Outlet } from 'react-router-dom';

const FullContainer = () => {
  return (
    <div flex-min-h-screen w-full justify-center>
      <Outlet />
    </div>
  );
};

export default FullContainer;
