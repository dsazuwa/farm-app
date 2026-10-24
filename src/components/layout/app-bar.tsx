import { cn } from 'cn';
import Brand from '../brand';
import ThemeToggle from './theme-toggle';
import { Button } from '../ui/button';

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
        <Button variant='ghost'>Log In</Button>
        <Button>Get Started</Button>
      </div>
    </header>
  );
}
