import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/features/auth/use-auth';
import PageLoading from '../layout/page-loading';

export default function GuestOnlyRoute() {
  const { user, isLoading, isRecovering } = useAuth();

  if (isLoading) return <PageLoading message='Loading your session…' />;

  if (isRecovering) return <Navigate to='/reset' replace />;

  if (user) return <Navigate to='/farms' replace />;

  return <Outlet />;
}
