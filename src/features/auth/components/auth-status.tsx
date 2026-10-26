import { cn } from 'cn';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { CardTitle } from '@/components/ui/card';

export default function AuthStatus({
  icon: Icon,
  title,
  description,
  hint,
  iconClassName,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  hint?: string;
  iconClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div role='status' className='flex flex-col items-center gap-4 text-center'>
      <div
        className={cn(
          'bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full',
          iconClassName,
        )}
      >
        <Icon className='size-7' aria-hidden='true' />
      </div>

      <CardTitle className='text-center text-xl font-bold'>{title}</CardTitle>

      <p className='flex flex-col'>
        <span>{description}</span>

        {hint && <span className='text-muted-foreground'>{hint}</span>}
      </p>

      {children}
    </div>
  );
}
