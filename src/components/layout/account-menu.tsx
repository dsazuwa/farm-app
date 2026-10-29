import { ChevronDown, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { ApiError } from '@/lib/api-error';

export default function AccountMenu({ email }: { email: string | undefined }) {
  const navigate = useNavigate();

  const { logout, isLoggingOut } = useAuth();
  const [logoutError, setLogoutError] = useState('');

  async function handleLogout() {
    if (isLoggingOut) return;

    setLogoutError('');

    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      setLogoutError(
        error instanceof ApiError
          ? error.message
          : "We couldn't sign you out. Please try again.",
      );
    }
  }

  return (
    <div className='relative'>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant='ghost'
              aria-label='Open account menu'
              className='gap-1 px-2'
              disabled={isLoggingOut}
            >
              <User className='size-5' aria-hidden='true' />
              <ChevronDown
                className='text-muted-foreground size-4'
                aria-hidden='true'
              />
            </Button>
          }
        />

        <DropdownMenuContent
          align='end'
          className='w-64 max-w-[calc(100vw-2rem)]'
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className='flex flex-col gap-1'>
              <span className='text-muted-foreground text-xs font-normal'>
                Signed in as
              </span>
              <span className='text-sm font-medium break-all'>{email}</span>
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
            <LogOut className='size-4' aria-hidden='true' />
            {isLoggingOut ? 'Signing out…' : 'Sign out'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {logoutError && (
        <p
          role='alert'
          className='bg-background text-destructive absolute top-full right-0 z-50 mt-2 w-64 rounded-md border p-3 text-sm shadow-sm'
        >
          {logoutError}
        </p>
      )}
    </div>
  );
}
