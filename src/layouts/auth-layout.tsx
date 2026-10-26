import { MoveLeft } from 'lucide-react';
import { Link, Outlet } from 'react-router';

import Brand from '@/components/brand';
import { Button } from '@/components/ui/button';

export default function AuthLayout() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6'>
      <div className='flex w-full max-w-md flex-col'>
        <Link to='/' className='mx-auto w-fit'>
          <Brand />
        </Link>

        <Outlet />

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
      </div>
    </main>
  );
}
