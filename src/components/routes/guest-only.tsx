import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/features/auth/use-auth';

export default function GuestOnlyRoute() {
  const { user, isLoading, isRecovering } = useAuth();

  if (isLoading) return <p role='status'>Loading…</p>;

  if (isRecovering) return <Navigate to='/reset' replace />;

  if (user) return <Navigate to='/farms' replace />;

  return <Outlet />;
}
