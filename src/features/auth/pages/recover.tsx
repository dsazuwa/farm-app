import { MailCheck } from 'lucide-react';
import { useState, type SubmitEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authService } from '@/features/auth/auth-service';
import AuthCard from '../components/auth-card';
import AuthStatus from '../components/auth-status';
import { ApiError } from '@/lib/api-error';

export default function Recover() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <AuthCard
      title={isSubmitted ? undefined : 'Forgot Your Password?'}
      footerText='Remember your password?'
      footerLinkText='Sign in'
      footerLinkHref='/sign-in'
    >
      {isSubmitted ? (
        <AuthStatus
          icon={MailCheck}
          title='Check your email!'
          description="If the account exists, we've sent a reset link."
          hint="Don't see it? Check your spam folder."
        />
      ) : (
        <RecoverForm onSuccess={() => setIsSubmitted(true)} />
      )}
    </AuthCard>
  );
}

function RecoverForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [requestError, setRequestError] = useState('');

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isPending) return;

    setRequestError('');
    setIsPending(true);

    try {
      await authService.requestPasswordReset(email.trim());

      onSuccess();
    } catch (error) {
      setRequestError(
        error instanceof ApiError
          ? error.message
          : 'Failed to start recovery process. Try again later.',
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='recover-email'>Email</FieldLabel>
          <Input
            id='recover-email'
            name='email'
            type='email'
            autoComplete='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setRequestError('');
            }}
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
          <Button disabled={isPending} type='submit'>
            {isPending ? 'Sending reset link...' : 'Send reset link'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
