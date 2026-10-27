import { useState, type SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ApiError } from '@/lib/api-error';
import { authService, type LoginInput } from '@/services/auth-service';
import AuthCard from '../components/auth-card';

export default function Login() {
  return (
    <AuthCard
      title='Welcome Back'
      // googleLabel='Continue with Google'
      footerText='New to Farm Desk?'
      footerLinkText='Create an account'
      footerLinkHref='/register'
    >
      <LoginForm />
    </AuthCard>
  );
}

function LoginForm() {
  const navigate = useNavigate();

  const [values, setValues] = useState<LoginInput>({ email: '', password: '' });
  const [requestError, setRequestError] = useState('');
  const [isPending, setIsPending] = useState(false);

  function updateField(field: keyof LoginInput, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setRequestError('');
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isPending) return;

    setRequestError('');
    setIsPending(true);

    try {
      await authService.loginWithEmail({
        email: values.email.trim(),
        password: values.password,
      });

      // UI-only test: no account is created.
      // await new Promise<void>((resolve) => {
      //   setTimeout(resolve, 800);
      // });

      navigate('/farms', { replace: true });
    } catch (error) {
      setRequestError(
        error instanceof ApiError
          ? error.message
          : 'Login failed. Please try again.',
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='login-email'>Email</FieldLabel>
          <Input
            id='login-email'
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
            <FieldLabel htmlFor='login-password'>Password</FieldLabel>

            <Button
              variant='link'
              className='h-fit p-0'
              render={<Link to='/recover'>Forgot your password?</Link>}
            />
          </div>

          <Input
            id='login-password'
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
