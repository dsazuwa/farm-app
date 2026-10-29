import { Link } from 'react-router';

import { useAuth } from '@/features/auth/use-auth';
import Brand from '../brand';
import { Button } from '../ui/button';
import AccountMenu from './account-menu';
import ThemeToggle from './theme-toggle';

export default function AppBar() {
  const { user, isLoading } = useAuth();

  return (
    <header className='flex flex-row items-center justify-between gap-4 border-b px-10 py-5.5'>
      <Brand />
      <div className='flex items-center gap-1'>
        <ThemeToggle />

        {!isLoading &&
          (user ? (
            <AccountMenu email={user.email} />
          ) : (
            <>
              <Button
                variant='ghost'
                render={<Link to='/sign-in'>Sign In</Link>}
              />
              <Button render={<Link to='/sign-up'>Get Started</Link>} />
            </>
          ))}
      </div>
    </header>
  );
}
