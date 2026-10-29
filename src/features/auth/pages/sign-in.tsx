import { useState, type SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ApiError } from '@/lib/api-error';
import { authService, type SignInInput } from '@/features/auth/auth-service';
import AuthCard from '../components/auth-card';

export default function SignIn() {
  return (
    <AuthCard
      title='Welcome Back'
      footerText='New to Farm Desk?'
      footerLinkText='Create an account'
      footerLinkHref='/sign-up'
    >
      <SignInForm />
    </AuthCard>
  );
}

function SignInForm() {
  const navigate = useNavigate();

  const [values, setValues] = useState<SignInInput>({
    email: '',
    password: '',
  });
  const [requestError, setRequestError] = useState('');
  const [isPending, setIsPending] = useState(false);

  function updateField(field: keyof SignInInput, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setRequestError('');
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isPending) return;

    setRequestError('');
    setIsPending(true);

    try {
      await authService.signInWithEmail({
        email: values.email.trim(),
        password: values.password,
      });

      navigate('/farms', { replace: true });
    } catch (error) {
      setRequestError(
        error instanceof ApiError
          ? error.message
          : 'Sign-in failed. Please try again.',
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='sign-in-email'>Email</FieldLabel>
          <Input
            id='sign-in-email'
            name='email'
            type='email'
            autoComplete='username'
            value={values.email}
            onChange={(e) => updateField('email', e.target.value)}
            disabled={isPending}
            required
          />
        </Field>

        <Field>
          <div className='flex items-center justify-between gap-2'>
            <FieldLabel htmlFor='sign-in-password'>Password</FieldLabel>

            <Button
              variant='link'
              className='h-fit p-0'
              render={<Link to='/recover'>Forgot your password?</Link>}
            />
          </div>

          <Input
            id='sign-in-password'
            name='password'
            type='password'
            autoComplete='current-password'
            value={values.password}
            onChange={(e) => updateField('password', e.target.value)}
            disabled={isPending}
            required
          />
        </Field>

        {requestError && (
          <p role='alert' className='text-destructive text-sm'>
            {requestError}
          </p>
        )}

        <Field>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Signing in…' : 'Sign in'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
