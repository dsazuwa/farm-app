import { Check, CircleX, LoaderCircle } from 'lucide-react';
import { useState, type SubmitEvent } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { useAuth } from '@/hooks/use-auth';
import { ApiError } from '@/lib/api-error';
import { authService } from '@/services/auth-service';
import type { FieldErrors } from '@/types/validation';
import AuthCard from '../components/auth-card';
import AuthStatus from '../components/auth-status';
import PasswordFields from '../components/password-fields';

type ResetStatus = 'loading' | 'form' | 'success' | 'invalid';
type ResetValues = { password: string; confirmPassword: string };

export default function ResetPassword() {
  const { user, isLoading, isRecovering, completeRecovery } = useAuth();
  const [result, setResult] = useState<ResetStatus>('form');
  const status = getStatus();

  function getStatus() {
    if (result === 'success') return 'success';
    if (isLoading) return 'loading';
    if (result === 'invalid' || !user || !isRecovering) return 'invalid';

    return 'form';
  }

  function handleSuccess() {
    setResult('success');
    completeRecovery();
  }

  return (
    <AuthCard
      footerText='Remember your password?'
      footerLinkText='Sign in'
      footerLinkHref='/sign-in'
      title={status === 'form' ? 'Set a New Password' : undefined}
    >
      {status === 'loading' && (
        <div
          role='status'
          className='flex flex-col items-center gap-4 py-4 text-center'
        >
          <LoaderCircle
            className='text-primary size-6 animate-spin'
            aria-hidden='true'
          />

          <p className='text-muted-foreground text-sm'>
            Checking your reset link…
          </p>
        </div>
      )}

      {status === 'form' && (
        <ResetForm
          onSuccess={handleSuccess}
          onInvalidLink={() => setResult('invalid')}
        />
      )}

      {status === 'success' && (
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
      )}

      {status === 'invalid' && (
        <AuthStatus
          icon={CircleX}
          iconClassName='bg-amber-500/10 text-yellow-700'
          title='Invalid or Expired Link'
          description='It may have already been used.'
          hint='Request a new password reset link.'
        >
          <Button
            className='w-full'
            render={<Link to='/recover'>Request a New Link</Link>}
          />
        </AuthStatus>
      )}
    </AuthCard>
  );
}

function ResetForm({
  onSuccess,
  onInvalidLink,
}: {
  onSuccess: () => void;
  onInvalidLink: () => void;
}) {
  const [values, setValues] = useState<ResetValues>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FieldErrors<ResetValues>>({});
  const [isPending, setIsPending] = useState(false);
  const [requestError, setRequestError] = useState('');

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

    if (isPending) return;

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setRequestError('');

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

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <PasswordFields
          idPrefix='reset'
          passwordLabel='New password'
          password={values.password}
          confirmPassword={values.confirmPassword}
          confirmPasswordError={errors.confirmPassword}
          disabled={isPending}
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
          <Button disabled={isPending} type='submit'>
            {isPending ? 'Updating password...' : 'Update password'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
