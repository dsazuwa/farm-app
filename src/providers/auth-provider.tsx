import { useEffect, useState, type ReactNode } from 'react';

import { AuthContext, type SignOutReason } from '@/context/auth-context';
import type { AuthSnapshot } from '@/lib/supabase';
import { authService } from '@/services/auth-service';

type AuthState = AuthSnapshot & {
  phase: 'idle' | 'signing-out';
  signOutReason: SignOutReason;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: undefined,
    isLoading: true,
    isRecovering: false,
    phase: 'idle', // whether a sign-out request is running
    signOutReason: undefined, // whether sign-out was intentional or the session ended otherwise
  });

  useEffect(() => {
    return authService.subscribe((snapshot) => {
      setState((previous) => {
        if (snapshot.user) {
          return {
            ...snapshot,
            phase: previous.phase,
            signOutReason:
              previous.phase === 'signing-out' ? 'manual-sign-out' : undefined,
          };
        }

        const intentionalSignOut =
          previous.phase === 'signing-out' ||
          previous.signOutReason === 'manual-sign-out';

        return {
          ...snapshot,
          phase: 'idle',
          signOutReason: intentionalSignOut
            ? 'manual-sign-out'
            : 'session-ended',
        };
      });
    });
  }, []);

  async function signOut(): Promise<void> {
    setState((previous) => ({
      ...previous,
      phase: 'signing-out',
      signOutReason: 'manual-sign-out',
    }));

    try {
      await authService.signOut();
    } catch (error) {
      setState((previous) => ({
        ...previous,
        phase: 'idle',
        signOutReason: previous.user ? undefined : previous.signOutReason,
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
        isSigningOut: state.phase === 'signing-out',
        signOutReason: state.signOutReason,
        signOut,
        completeRecovery: authService.completeRecovery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
