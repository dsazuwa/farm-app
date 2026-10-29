import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './app.tsx';
import AuthenticatedRoute from './components/routes/auth-route.tsx';
import GuestOnlyRoute from './components/routes/guest-only.tsx';
import AuthLayout from './features/auth/auth-layout.tsx';
import AuthProvider from './features/auth/auth-provider.tsx';
import Recover from './features/auth/pages/recover.tsx';
import ResetPassword from './features/auth/pages/reset.tsx';
import SignIn from './features/auth/pages/sign-in.tsx';
import SignUp from './features/auth/pages/sign-up.tsx';
import FarmsPage from './features/farms/farms-page.tsx';
import './index.css';
import FarmsLayout from './layouts/farms-layout.tsx';
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
                <Route path='sign-in' element={<SignIn />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='recover' element={<Recover />} />
              </Route>
            </Route>

            <Route path='reset' element={<ResetPassword />} />

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
