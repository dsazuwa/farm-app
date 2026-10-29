import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './app.tsx';
import AuthenticatedRoute from './components/routes/auth-route.tsx';
import GuestOnlyRoute from './components/routes/guest-only.tsx';
import Login from './features/auth/pages/login.tsx';
import Recover from './features/auth/pages/recover.tsx';
import Register from './features/auth/pages/register.tsx';
import ResetPassword from './features/auth/pages/reset.tsx';
import FarmsPage from './features/farms/farms-page.tsx';
import './index.css';
import AuthLayout from './layouts/auth-layout.tsx';
import FarmsLayout from './layouts/farms-layout.tsx';
import AuthProvider from './providers/auth-provider.tsx';
import ThemeProvider from './providers/theme-provider.tsx';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<GuestOnlyRoute />}>
              <Route index element={<App />} />

              <Route element={<AuthLayout />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='recover' element={<Recover />} />
                <Route path='reset' element={<ResetPassword />} />
              </Route>
            </Route>

            <Route element={<AuthenticatedRoute />}>
              <Route element={<FarmsLayout />}>
                <Route path='farms' element={<FarmsPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
