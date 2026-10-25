import { cn } from 'cn';
import { Link } from 'react-router';

import Brand from '../brand';
import { Button } from '../ui/button';
import ThemeToggle from './theme-toggle';

export default function AppBar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'flex flex-row items-center justify-between gap-4 border-b',
        className,
      )}
    >
      <Brand />
      <div className='flex items-center gap-1'>
        <ThemeToggle />
        <Button variant='ghost' render={<Link to='/login'>Log In</Link>} />
        <Button render={<Link to='/register'>Get Started</Link>} />
      </div>
    </header>
  );
}
