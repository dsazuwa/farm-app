import { useEffect, useState, type ReactNode } from 'react';

import { AuthContext } from '@/context/auth-context';
import type { AuthSnapshot } from '@/lib/supabase';
import { authService } from '@/services/auth-service';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthSnapshot>({
    user: undefined,
    isLoading: true,
    isRecovering: false,
  });

  useEffect(() => {
    return authService.subscribe(setState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        completeRecovery: authService.completeRecovery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
