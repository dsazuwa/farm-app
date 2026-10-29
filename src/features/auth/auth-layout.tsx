import { MoveLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, Outlet } from 'react-router';

import Brand from '@/components/brand';
import { Button } from '@/components/ui/button';
import { useAuth } from './use-auth';

export default function AuthLayout({ children }: { children?: ReactNode }) {
  const { user, isLoading } = useAuth();
  const isAuth = !isLoading && !user;

  return isLoading ? (
    <></>
  ) : (
    <main className='flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6'>
      <div className='flex w-full max-w-md flex-col items-center gap-4'>
        <Link to='/' className='mx-auto w-fit'>
          <Brand />
        </Link>

        {children ?? <Outlet />}

        {isAuth && (
          <Button
            variant='link'
            className='mx-auto h-fit'
            render={
              <Link
                to='/'
                className='text-muted-foreground flex items-center gap-2 text-xs'
              >
                <MoveLeft size={16} />
                Back to Home
              </Link>
            }
          />
        )}
      </div>
    </main>
  );
}
