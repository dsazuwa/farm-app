import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AuthCard from '../components/auth-card';

export default function Login() {
  return (
    <AuthCard
      title='Welcome Back'
      googleLabel='Continue with Google'
      footerText='New to Farm Desk?'
      footerLinkText='Create an account'
      footerLinkHref='/register'
    >
      <LoginForm />
    </AuthCard>
  );
}

function LoginForm() {
  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='login-email'>Email</FieldLabel>
          <Input
            id='login-email'
            name='email'
            type='email'
            autoComplete='email'
            required
          />
        </Field>

        <Field>
          <div className='flex items-center justify-between gap-2'>
            <FieldLabel htmlFor='login-password'>Password</FieldLabel>

            <Button
              variant='link'
              className='h-fit p-0'
              render={<Link to='/recover'>Forgot your password?</Link>}
            />
          </div>

          <Input
            id='login-password'
            name='password'
            type='password'
            autoComplete='current-password'
            required
          />
        </Field>

        <Field>
          <Button type='submit'>Sign in</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
