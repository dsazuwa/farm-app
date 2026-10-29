import { useEffect, useState, type ReactNode } from 'react';

import { AuthContext, type LogOutReason } from '@/context/auth-context';
import type { AuthSnapshot } from '@/lib/supabase';
import { authService } from '@/services/auth-service';

type AuthState = AuthSnapshot & {
  phase: 'idle' | 'logging-out';
  logOutReason: LogOutReason;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: undefined,
    isLoading: true,
    isRecovering: false,
    phase: 'idle', // whether a sign-out request is running
    logOutReason: undefined, // whether sign-out was intentional or the session ended otherwise
  });

  useEffect(() => {
    return authService.subscribe((snapshot) => {
      setState((previous) => {
        if (snapshot.user) {
          return {
            ...snapshot,
            phase: previous.phase,
            logOutReason:
              previous.phase === 'logging-out' ? 'logout' : undefined,
          };
        }

        const intentionalLogout =
          previous.phase === 'logging-out' ||
          previous.logOutReason === 'logout';

        return {
          ...snapshot,
          phase: 'idle',
          logOutReason: intentionalLogout ? 'logout' : 'session-ended',
        };
      });
    });
  }, []);

  async function logout(): Promise<void> {
    setState((previous) => ({
      ...previous,
      phase: 'logging-out',
      logOutReason: 'logout',
    }));

    try {
      await authService.logout();
    } catch (error) {
      setState((previous) => ({
        ...previous,
        phase: 'idle',
        logOutReason: previous.user ? undefined : previous.logOutReason,
      }));

      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        isRecovering: state.isRecovering,
        isLoggingOut: state.phase === 'logging-out',
        logOutReason: state.logOutReason,
        logout,
        completeRecovery: authService.completeRecovery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
