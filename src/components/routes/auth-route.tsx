import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/hooks/use-auth';

export default function AuthenticatedRoute() {
  const { user, isLoading, isRecovering, logOutReason } = useAuth();

  if (isLoading) return <p role='status'>Loading…</p>;

  if (!user)
    return <Navigate to={logOutReason === 'logout' ? '/' : '/login'} replace />;

  if (isRecovering) return <Navigate to='/reset' replace />;

  return <Outlet />;
}
