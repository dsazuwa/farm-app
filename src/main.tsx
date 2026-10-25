import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './app.tsx';
import Login from './features/auth/pages/login.tsx';
import Recover from './features/auth/pages/recover.tsx';
import Register from './features/auth/pages/register.tsx';
import { ThemeProvider } from './hooks/theme-context.tsx';
import './index.css';
import AuthLayout from './layouts/auth-layout.tsx';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />

          <Route element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='recover' element={<Recover />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
