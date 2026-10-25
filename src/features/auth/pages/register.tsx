import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import AuthLayout from '../../../layouts/auth-layout';

export default function Register() {
  return (
    <AuthLayout
      title='Create Your Account'
      googleLabel='Sign up with Google'
      footerText='Already have an account?'
      footerLinkText='Sign in'
      footerLinkHref='/login'
    >
      <RegisterForm />
    </AuthLayout>
  );
}

function RegisterForm() {
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
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          name='password'
          type='password'
          autoComplete='new-password'
          required
        />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='confirm-password'>Confirm Password</Label>
        <Input
          id='confirm-password'
          name='confirmPassword'
          type='password'
          autoComplete='new-password'
          required
        />
      </div>

      <Button type='submit' className='w-full'>
        Create account
      </Button>
    </form>
  );
}
