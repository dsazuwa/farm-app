import { Check, CircleX, Clock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import AuthCard from '../components/auth-card';
import AuthStatus from '../components/auth-status';

type ResetStatus = 'form' | 'success' | 'expired' | 'invalid';

export default function ResetPassword() {
  const [status] = useState<ResetStatus>('invalid');

  return (
    <AuthCard
      footerText='Remember your password?'
      footerLinkText='Sign in'
      footerLinkHref='/login'
      title={status === 'form' ? 'Set a New Password' : undefined}
    >
      {status === 'success' && (
        <AuthStatus
          icon={Check}
          title='Password updated'
          description='Your password has been reset.'
          hint='Sign in with your new password.'
        >
          <Button
            className='w-full'
            render={<Link to='/login'>Sign In</Link>}
          />
        </AuthStatus>
      )}

      {status === 'expired' && (
        <AuthStatus
          icon={Clock}
          iconClassName='bg-amber-500/10 text-yellow-700'
          title='Expired Link'
          description='Request a new link to reset your password.'
        >
          <Button className='w-full'>Request a New Link</Button>
        </AuthStatus>
      )}

      {status === 'invalid' && (
        <AuthStatus
          icon={CircleX}
          iconClassName='bg-amber-500/10 text-yellow-700'
          title='Invalid Link'
          description='It may have already been used.'
          hint='Request a new password reset link.'
        >
          <Button
            className='w-full'
            render={<Link to='/recover'>Request a New Link</Link>}
          />
        </AuthStatus>
      )}
    </AuthCard>
  );
}
