import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PASSWORD_HELP } from '@/lib/validation';

type PasswordFieldsProps = {
  idPrefix: string;
  passwordLabel?: string;
  password: string;
  confirmPassword: string;
  confirmPasswordError?: string;
  disabled: boolean;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
};

export default function PasswordFields({
  idPrefix,
  passwordLabel = 'Password',
  password,
  confirmPassword,
  confirmPasswordError,
  disabled,
  onPasswordChange,
  onConfirmPasswordChange,
}: PasswordFieldsProps) {
  const passwordId = `${idPrefix}-password`;
  const helpId = `${passwordId}-help`;
  const confirmId = `${idPrefix}-confirm-password`;
  const errorId = `${confirmId}-error`;

  return (
    <>
      <Field>
        <FieldLabel htmlFor={passwordId}>{passwordLabel}</FieldLabel>

        <Input
          id={passwordId}
          name='password'
          type='password'
          autoComplete='new-password'
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          disabled={disabled}
          minLength={8}
          pattern={String.raw`(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{8,}`}
          title={PASSWORD_HELP}
          aria-describedby={helpId}
          required
        />

        <FieldDescription id={helpId}>{PASSWORD_HELP}</FieldDescription>
      </Field>

      <Field data-invalid={Boolean(confirmPasswordError)}>
        <FieldLabel htmlFor={confirmId}>Confirm password</FieldLabel>

        <Input
          id={confirmId}
          name='confirmPassword'
          type='password'
          autoComplete='new-password'
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          disabled={disabled}
          aria-invalid={Boolean(confirmPasswordError)}
          aria-describedby={confirmPasswordError ? errorId : undefined}
          required
        />

        {confirmPasswordError && (
          <FieldError id={errorId}>{confirmPasswordError}</FieldError>
        )}
      </Field>
    </>
  );
}
