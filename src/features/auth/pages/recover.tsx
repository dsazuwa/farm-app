import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import AuthLayout from '../../../layouts/auth-layout';

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

      <Button type='submit' className='w-full'>
        Send reset link
      </Button>
    </form>
  );
}
