import { cn } from 'cn';

export default function Footer({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 border-t', className)}>
      <span className='text-chart-5 text-3xl select-none'>❧</span>©{' '}
      {new Date().getFullYear()} Farm Desk
    </div>
  );
}
