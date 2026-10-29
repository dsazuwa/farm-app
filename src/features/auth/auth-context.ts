import { createContext } from 'react';

import type { AuthUser } from '@/features/auth/auth-service';

export type SignOutReason = 'manual-sign-out' | 'session-ended' | undefined;

export type AuthContextValue = {
  user: AuthUser | undefined;
  isLoading: boolean;
  isRecovering: boolean;
  isSigningOut: boolean;
  signOutReason: SignOutReason;
  signOut: () => Promise<void>;
  completeRecovery: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
