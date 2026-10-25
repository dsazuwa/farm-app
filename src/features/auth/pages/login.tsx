import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import AuthLayout from '../../../layouts/auth-layout';

export default function Login() {
  return (
    <AuthLayout
      title='Welcome Back'
      googleLabel='Continue with Google'
      footerText='New to Farm Desk?'
      footerLinkText='Create an account'
      footerLinkHref='/register'
    >
      <LoginForm />
    </AuthLayout>
  );
}

function LoginForm() {
  return (
    <form className='flex flex-col gap-6'>
      <div className='grid gap-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          required
        />
      </div>

      <div className='grid gap-2'>
        <div className='flex items-center justify-between gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Button
            variant='link'
            className='p-0'
            render={<a href='/forgot-password'>Forgot your password?</a>}
          />
        </div>

        <Input
          id='password'
          name='password'
          type='password'
          autoComplete='current-password'
          required
        />
      </div>

      <Button type='submit' className='w-full'>
        Sign in
      </Button>
    </form>
  );
}
