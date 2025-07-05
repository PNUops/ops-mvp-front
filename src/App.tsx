import { useEffect, useState } from 'react';
import './index.css';
import AppRoutes from '@route/AppRoutes';
import { useLocation } from 'react-router-dom';

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  const routes = AppRoutes();
  return <>{routes}</>;
};

export default App;
