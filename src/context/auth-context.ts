import { createContext } from 'react';

import type { AuthUser } from '@/services/auth-service';

export type LogOutReason = 'logout' | 'session-ended' | undefined;

export type AuthContextValue = {
  user: AuthUser | undefined;
  isLoading: boolean;
  isRecovering: boolean;
  isLoggingOut: boolean;
  logOutReason: LogOutReason;
  logout: () => Promise<void>;
  completeRecovery: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
