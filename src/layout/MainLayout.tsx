import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex-col">
      <Header setMobileSidebarOpen={setMobileSidebarOpen} />
      <div className="flex flex-1">
        <Sidebar mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
