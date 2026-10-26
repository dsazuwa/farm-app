import { MailCheck } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AuthCard from '../components/auth-card';
import AuthStatus from '../components/auth-status';

export default function Recover() {
  const [isSubmitted, setIsSubmitted] = useState(true);

  return (
    <AuthCard
      title={isSubmitted ? undefined : 'Forgot Your Password?'}
      footerText='Remember your password?'
      footerLinkText='Sign in'
      footerLinkHref='/login'
    >
      {isSubmitted ? (
        <AuthStatus
          icon={MailCheck}
          title='Check your email!'
          description='We sent you a password reset link.'
          hint=" Don't see it? Check your spam folder."
        />
      ) : (
        <RecoverForm onSubmit={() => setIsSubmitted(true)} />
      )}
    </AuthCard>
  );
}

function RecoverForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='recover-email'>Email</FieldLabel>
          <Input
            id='recover-email'
            name='email'
            type='email'
            autoComplete='email'
            required
          />
        </Field>

        <Field>
          <Button type='submit'>Send reset link</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
