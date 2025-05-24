import { useState } from 'react';
import './index.css';
import AppRoutes from '@route/AppRoutes';

const App = () => {
  const routes = AppRoutes();
  return <>{routes}</>;
};

export default App;
