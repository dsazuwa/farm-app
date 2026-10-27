import { MailCheck } from 'lucide-react';
import { useState, type SubmitEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authService, type RegisterInput } from '@/services/auth-service';
import type { FieldErrors } from '@/types/validation';
import AuthCard from '../components/auth-card';
import AuthStatus from '../components/auth-status';
import PasswordFields from '../components/password-fields';

type RegisterValues = RegisterInput & { confirmPassword: string };

export default function Register() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <AuthCard
      title={isSubmitted ? undefined : 'Create Your Account'}
      // googleLabel='Sign up with Google'
      footerText='Already have an account?'
      footerLinkText='Sign in'
      footerLinkHref='/login'
    >
      {isSubmitted ? (
        <AuthStatus
          icon={MailCheck}
          title='Check your email!'
          description='Check your inbox for an account confirmation link.'
          hint="Don't see it? Check your spam folder."
        />
      ) : (
        <RegisterForm onSuccess={() => setIsSubmitted(true)} />
      )}
    </AuthCard>
  );
}

function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [values, setValues] = useState<RegisterValues>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FieldErrors<RegisterValues>>({});
  const [requestError, setRequestError] = useState('');
  const [isPending, setIsPending] = useState(false);

  function validate(values: RegisterValues): FieldErrors<RegisterValues> {
    const errors: FieldErrors<RegisterValues> = {};

    if (values.password !== values.confirmPassword)
      errors.confirmPassword = 'Passwords do not match.';

    return errors;
  }

  function updateField(field: keyof RegisterValues, value: string) {
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
      await authService.register({
        email: values.email.trim(),
        password: values.password,
      });

      onSuccess();
    } catch {
      setRequestError('Registration failed, please try again.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='register-email'>Email</FieldLabel>
          <Input
            id='register-email'
            name='email'
            type='email'
            autoComplete='email'
            value={values.email}
            onChange={(e) => updateField('email', e.target.value)}
            disabled={isPending}
            required
          />
        </Field>

        <PasswordFields
          idPrefix='register'
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
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Creating account ...' : 'Create account'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
