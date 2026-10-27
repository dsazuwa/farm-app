import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

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
        email: session.user.email ?? undefined,
      }
    : undefined;

  let isRecovering = snapshot.isRecovering;

  if (!user || event === 'SIGNED_OUT') {
    isRecovering = false;
  } else if (event === 'PASSWORD_RECOVERY') {
    isRecovering = true;
  } else if (event === 'SIGNED_IN') {
    isRecovering = false;
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
  snapshot = {
    ...snapshot,
    isRecovering: false,
  };

  for (const listener of listeners) listener(snapshot);
}
