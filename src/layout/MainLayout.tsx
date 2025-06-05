import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import FullContainer from './FullContainer';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div>
        <FullContainer />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
