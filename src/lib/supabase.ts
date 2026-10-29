import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const RECOVERY_KEY = 'farm-desk:password-recovery';
const RECOVERY_DURATION = 30 * 60 * 1000;

function saveRecovery(userId: string): void {
  try {
    sessionStorage.setItem(
      RECOVERY_KEY,
      JSON.stringify({
        userId,
        expiresAt: Date.now() + RECOVERY_DURATION,
      }),
    );
  } catch {
    // Recovery can continue, but won't survive refresh.
  }
}

function clearRecovery(): void {
  try {
    sessionStorage.removeItem(RECOVERY_KEY);
  } catch {
    // Storage may be unavailable.
  }
}

function hasSavedRecovery(userId: string): boolean {
  try {
    const saved = sessionStorage.getItem(RECOVERY_KEY);

    if (!saved) return false;

    const recovery = JSON.parse(saved);

    if (
      recovery?.userId === userId &&
      typeof recovery.expiresAt === 'number' &&
      recovery.expiresAt > Date.now()
    ) {
      return true;
    }
  } catch {
    // Treat unreadable data as an invalid marker.
  }

  clearRecovery();
  return false;
}

export type AuthSnapshot = {
  user:
    | {
        id: string;
        email: string | undefined;
      }
    | undefined;
  isLoading: boolean;
  isRecovering: boolean;
};

let snapshot: AuthSnapshot = {
  user: undefined,
  isLoading: true,
  isRecovering: false,
};

const listeners = new Set<(state: AuthSnapshot) => void>();

// Register once, before React mounts.
supabase.auth.onAuthStateChange((event, session) => {
  const user = session
    ? {
        id: session.user.id,
        email: session.user.email,
      }
    : undefined;

  let isRecovering = snapshot.isRecovering;

  if (!user || event === 'SIGNED_OUT') {
    clearRecovery();
    isRecovering = false;
  } else if (event === 'PASSWORD_RECOVERY') {
    saveRecovery(user.id);
    isRecovering = true;
  } else if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
    isRecovering = hasSavedRecovery(user.id);
  }

  snapshot = {
    user,
    isLoading: false,
    isRecovering,
  };

  for (const listener of listeners) listener(snapshot);
});

export function subscribeToAuth(
  listener: (state: AuthSnapshot) => void,
): () => void {
  listeners.add(listener);

  // Replay the latest state, including early recovery events.
  listener(snapshot);

  return () => {
    listeners.delete(listener);
  };
}

export function completePasswordRecovery(): void {
  clearRecovery();

  snapshot = {
    ...snapshot,
    isRecovering: false,
  };

  for (const listener of listeners) listener(snapshot);
}
