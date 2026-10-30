import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import AppRoutes from './app-routes.tsx';
import AuthProvider from './features/auth/auth-provider.tsx';
import './index.css';
import ThemeProvider from './providers/theme-provider.tsx';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
