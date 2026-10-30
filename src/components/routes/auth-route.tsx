import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/features/auth/use-auth';
import PageLoading from '../layout/page-loading';

export default function AuthenticatedRoute() {
  const { user, isLoading, isRecovering, signOutReason } = useAuth();

  if (isLoading) return <PageLoading message='Loading your session…' />;

  if (!user)
    return (
      <Navigate
        to={signOutReason === 'manual-sign-out' ? '/' : '/sign-in'}
        replace
      />
    );

  if (isRecovering) return <Navigate to='/reset' replace />;

  return <Outlet />;
}
