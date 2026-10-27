import { createContext } from 'react';

import type { AuthUser } from '@/services/auth-service';

export type AuthContextValue = {
  user: AuthUser | undefined;
  isLoading: boolean;
  isRecovering: boolean;
  completeRecovery: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
