import { supabase } from '@/lib/supabase';

export type AuthCredentials = {
  email: string;
  password: string;
};

export type RegisterInput = AuthCredentials;
export type LoginInput = AuthCredentials;

async function register({ email, password }: RegisterInput) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { emailRedirectTo: `${globalThis.location.origin}/login` },
  });

  if (error) throw error;

  return data;
}

async function loginWithEmail({ email, password }: LoginInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) throw error;

  return data;
}

export const authService = {
  register,
  loginWithEmail,
};
