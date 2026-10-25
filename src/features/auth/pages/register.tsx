import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AuthCard from '../components/auth-card';

export default function Register() {
  return (
    <AuthCard
      title='Create Your Account'
      googleLabel='Sign up with Google'
      footerText='Already have an account?'
      footerLinkText='Sign in'
      footerLinkHref='/login'
    >
      <RegisterForm />
    </AuthCard>
  );
}

function RegisterForm() {
  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='register-email'>Email</FieldLabel>
          <Input
            id='register-email'
            name='email'
            type='email'
            autoComplete='email'
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor='register-password'>Password</FieldLabel>
          <Input
            id='register-password'
            name='password'
            type='password'
            autoComplete='new-password'
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor='confirm-password'>Confirm password</FieldLabel>
          <Input
            id='confirm-password'
            name='confirmPassword'
            type='password'
            autoComplete='new-password'
            required
          />
        </Field>

        <Field>
          <Button type='submit'>Create account</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
