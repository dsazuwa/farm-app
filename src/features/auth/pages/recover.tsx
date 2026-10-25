import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';

export default function Recover() {
  return (
    <AuthLayout
      title='Forgot Your Password?'
      footerText='Remember your password?'
      footerLinkText='Sign in'
      footerLinkHref='/login'
    >
      <RecoverForm />
    </AuthLayout>
  );
}

function RecoverForm() {
  return (
    <form>
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
