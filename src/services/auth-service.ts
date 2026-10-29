import { ApiError } from '@/lib/api-error';
import { PASSWORD_HELP } from '@/lib/validation';
import {
  supabase,
  subscribeToAuth,
  completePasswordRecovery,
} from '@/lib/supabase';

export type AuthUser = {
  id: string;
  email: string | undefined;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type SignUpInput = AuthCredentials;
export type SignInInput = AuthCredentials;

export const authService = {
  subscribe: subscribeToAuth,

  completeRecovery: completePasswordRecovery,

  async signUp({ email, password }: SignUpInput) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${globalThis.location.origin}/sign-in`,
        },
      });

      if (error) throw error;

      return data;
    } catch (error) {
      throw normalizeAuthError(
        error,
        "We couldn't create your account. Please try again.",
      );
    }
  },

  async signInWithEmail({ email, password }: SignInInput) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      return data;
    } catch (error) {
      throw normalizeAuthError(
        error,
        "We couldn't sign you in. Check your credentials and try again.",
      );
    }
  },

  async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    } catch (error) {
      throw normalizeAuthError(
        error,
        'We failed to sign you out. Please try again.',
      );
    }
  },

  async requestPasswordReset(email: string): Promise<void> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${globalThis.location.origin}/reset`,
        },
      );

      if (error) throw error;
    } catch (error) {
      throw normalizeAuthError(
        error,
        "We couldn't send the reset link. Please try again.",
      );
    }
  },

  async updatePassword(password: string): Promise<void> {
    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;
    } catch (error) {
      throw normalizeAuthError(
        error,
        "We couldn't update your password. Please try again.",
      );
    }
  },
};

function normalizeAuthError(error: unknown, fallbackMessage: string): ApiError {
  if (error instanceof ApiError) return error;

  const details = typeof error === 'object' && error !== null ? error : {};

  const status = 'status' in details ? details.status : undefined;
  const code = 'code' in details ? details.code : undefined;

  if (status === 429) {
    return new ApiError(
      'RATE_LIMITED',
      'Too many attempts. Please wait before trying again.',
    );
  }

  switch (code) {
    case 'same_password': {
      return new ApiError(
        'SAME_PASSWORD',
        'Choose a password different from your current password.',
      );
    }

    case 'weak_password': {
      return new ApiError('WEAK_PASSWORD', PASSWORD_HELP);
    }

    case 'session_not_found':
    case 'session_expired':
    case 'refresh_token_not_found':
    case 'refresh_token_already_used': {
      return new ApiError(
        'INVALID_SESSION',
        'Your session is no longer valid. Please sign in again.',
      );
    }

    default: {
      return new ApiError('REQUEST_FAILED', fallbackMessage);
    }
  }
}
