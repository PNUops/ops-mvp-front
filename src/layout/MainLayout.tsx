import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
