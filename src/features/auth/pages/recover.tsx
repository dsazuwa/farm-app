import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AuthCard from '../components/auth-card';

export default function Recover() {
  return (
    <AuthCard
      title='Forgot Your Password?'
      footerText='Remember your password?'
      footerLinkText='Sign in'
      footerLinkHref='/login'
    >
      <RecoverForm />
    </AuthCard>
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
