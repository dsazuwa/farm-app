import { Check, CircleX } from 'lucide-react';
import { useState, type SubmitEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';

import PageLoading from '@/components/layout/page-loading';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { authService } from '@/features/auth/auth-service';
import { useAuth } from '@/features/auth/use-auth';
import { ApiError } from '@/lib/api-error';
import type { FieldErrors } from '@/types/validation';
import AuthLayout from '../auth-layout';
import AuthCard from '../components/auth-card';
import AuthStatus from '../components/auth-status';
import PasswordFields from '../components/password-fields';
import PageTitle from '@/components/page-title';

type ResetValues = { password: string; confirmPassword: string };

type ResetResult = 'idle' | 'success' | 'invalid';

export default function ResetPassword() {
  const { user, isLoading, isRecovering, completeRecovery } = useAuth();
  const [result, setResult] = useState<ResetResult>('idle');

  function handleSuccess() {
    setResult('success');
    completeRecovery();
  }

  function handleInvalidLink() {
    setResult('invalid');
    completeRecovery();
  }

  if (isLoading) return <PageLoading message='Checking your reset link…' />;

  if (result === 'success')
    return (
      <>
        <PageTitle title='Password Updated!' />

        <AuthLayout>
          <AuthCard>
            <AuthStatus
              icon={Check}
              title='Password Updated'
              description='Your password has been reset.'
              hint='You can now continue to your farms.'
            >
              <Button
                className='w-full'
                render={
                  <Link to='/farms' replace>
                    Continue to Farms
                  </Link>
                }
              />
            </AuthStatus>
          </AuthCard>
        </AuthLayout>
      </>
    );

  // Normally signed-in users don't need the recovery page.
  if (user && !isRecovering) return <Navigate to='/farms' replace />;

  // No usable recovery flow.
  if (result === 'invalid' || !user || !isRecovering)
    return (
      <>
        <PageTitle title='Invalid Reset Link' />

        <AuthLayout>
          <AuthCard
            footer={{
              text: 'Remember your password?',
              href: '/sign-in',
              linkText: 'Sign in',
            }}
          >
            <AuthStatus
              icon={CircleX}
              iconClassName='bg-amber-500/10 text-yellow-700'
              title='Invalid or Expired Link'
              description='This password reset link is no longer valid.'
              hint='Request a new password reset link.'
            >
              <Button
                className='w-full'
                render={
                  <Link to='/recover' replace>
                    Request a New Link
                  </Link>
                }
              />
            </AuthStatus>
          </AuthCard>
        </AuthLayout>
      </>
    );

  // An authenticated recovery session is ready.
  return (
    <>
      <PageTitle title='Reset Password' />

      <AuthLayout>
        <AuthCard title='Set a New Password'>
          <ResetForm
            onSuccess={handleSuccess}
            onInvalidLink={handleInvalidLink}
          />
        </AuthCard>
      </AuthLayout>
    </>
  );
}

function ResetForm({
  onSuccess,
  onInvalidLink,
}: {
  onSuccess: () => void;
  onInvalidLink: () => void;
}) {
  const navigate = useNavigate();
  const { signOut, isSigningOut } = useAuth();
  const [values, setValues] = useState<ResetValues>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FieldErrors<ResetValues>>({});
  const [isPending, setIsPending] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [signOutError, setSignOutError] = useState('');

  const isDisabled = isPending || isSigningOut;

  function validate(values: ResetValues): FieldErrors<ResetValues> {
    const errors: FieldErrors<ResetValues> = {};

    if (values.password !== values.confirmPassword)
      errors.confirmPassword = 'Passwords do not match.';

    return errors;
  }

  function updateField(field: keyof ResetValues, value: string) {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors({});
    setRequestError('');
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isDisabled) return;

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setRequestError('');
    setSignOutError('');

    if (Object.keys(validationErrors).length > 0) return;

    setIsPending(true);

    try {
      await authService.updatePassword(values.password);

      onSuccess();
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === 'INVALID_SESSION') {
          onInvalidLink();
          return;
        }

        setRequestError(error.message);
      } else {
        setRequestError('Something went wrong. Please try again.');
      }
    } finally {
      setIsPending(false);
    }
  }

  async function handleCancel() {
    if (isDisabled) return;

    setRequestError('');
    setSignOutError('');

    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (error) {
      setSignOutError(
        error instanceof ApiError
          ? error.message
          : "We couldn't sign you out. Please try again.",
      );
    }
  }

  return (
    <>
      {signOutError && (
        <p role='alert' className='text-destructive mb-4 text-sm'>
          {signOutError}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <PasswordFields
            idPrefix='reset'
            passwordLabel='New password'
            password={values.password}
            confirmPassword={values.confirmPassword}
            confirmPasswordError={errors.confirmPassword}
            disabled={isDisabled}
            onPasswordChange={(value) => updateField('password', value)}
            onConfirmPasswordChange={(value) =>
              updateField('confirmPassword', value)
            }
          />

          {requestError && (
            <p role='alert' className='text-destructive text-sm'>
              {requestError}
            </p>
          )}

          <Field>
            <Button disabled={isDisabled} type='submit'>
              {isPending ? 'Updating password...' : 'Update password'}
            </Button>

            <Button
              type='button'
              variant='ghost'
              onClick={handleCancel}
              disabled={isDisabled}
            >
              {isSigningOut ? 'Signing out…' : 'Cancel and sign out'}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
