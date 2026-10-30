import { MailCheck } from 'lucide-react';
import { useState, type SubmitEvent } from 'react';

import PageTitle from '@/components/page-title';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authService, type SignUpInput } from '@/features/auth/auth-service';
import { ApiError } from '@/lib/api-error';
import type { FieldErrors } from '@/types/validation';
import AuthCard from '../components/auth-card';
import AuthStatus from '../components/auth-status';
import PasswordFields from '../components/password-fields';

type SignUpValues = SignUpInput & { confirmPassword: string };

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <PageTitle title='Create Account' />

      <AuthCard
        title={isSubmitted ? undefined : 'Create Your Account'}
        footer={{
          text: 'Already have an account?',
          href: '/sign-in',
          linkText: 'Sign in',
        }}
      >
        {isSubmitted ? (
          <AuthStatus
            icon={MailCheck}
            title='Check your email!'
            description='Check your inbox for an email confirmation link.'
            hint="Don't see it? Check your spam folder."
          />
        ) : (
          <SignUpForm onSuccess={() => setIsSubmitted(true)} />
        )}
      </AuthCard>
    </>
  );
}

function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const [values, setValues] = useState<SignUpValues>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FieldErrors<SignUpValues>>({});
  const [requestError, setRequestError] = useState('');
  const [isPending, setIsPending] = useState(false);

  function validate(values: SignUpValues): FieldErrors<SignUpValues> {
    const errors: FieldErrors<SignUpValues> = {};

    if (values.password !== values.confirmPassword)
      errors.confirmPassword = 'Passwords do not match.';

    return errors;
  }

  function updateField(field: keyof SignUpValues, value: string) {
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
      await authService.signUp({
        email: values.email.trim(),
        password: values.password,
      });

      onSuccess();
    } catch (error) {
      setRequestError(
        error instanceof ApiError
          ? error.message
          : 'Sign-up failed. Please try again.',
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='sign-up-email'>Email</FieldLabel>
          <Input
            id='sign-up-email'
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
          idPrefix='sign-up'
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
            {isPending ? 'Creating account…' : 'Create account'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
