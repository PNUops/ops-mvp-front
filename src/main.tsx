import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { worker } from '@mocks/browsers';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from 'stores/queryClient';
import { Toaster } from '@components/Toaster';

if (process.env.NODE_ENV === 'development' && import.meta.env.VITE_USE_MSW === 'true') {
  await worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
