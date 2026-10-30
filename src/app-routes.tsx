import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import App from './app.tsx';
import PageLoading from './components/layout/page-loading.tsx';
import AuthenticatedRoute from './components/routes/auth-route.tsx';
import GuestOnlyRoute from './components/routes/guest-only.tsx';
import AuthLayout from './features/auth/auth-layout.tsx';
import FarmsLayout from './layouts/farms-layout.tsx';

const SignIn = lazy(() =>
  import('./features/auth/guest-auth-pages').then((module) => ({
    default: module.SignIn,
  })),
);

const SignUp = lazy(() =>
  import('./features/auth/guest-auth-pages').then((module) => ({
    default: module.SignUp,
  })),
);

const Recover = lazy(() =>
  import('./features/auth/guest-auth-pages').then((module) => ({
    default: module.Recover,
  })),
);

const ResetPassword = lazy(() => import('./features/auth/pages/reset.tsx'));
const FarmsPage = lazy(() => import('./features/farms/farms-page.tsx'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoading />}>
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
    </Suspense>
  );
}
