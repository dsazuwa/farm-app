import { Eye, EyeOff } from 'lucide-react';
import { useState, type ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type PasswordInputProps = Omit<ComponentProps<typeof Input>, 'type'>;

export default function PasswordInput({
  className,
  disabled,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='relative'>
      <Input
        {...props}
        type={isVisible ? 'text' : 'password'}
        disabled={disabled}
        className={cn('peer pr-12', className)}
      />

      <Button
        type='button'
        variant='ghost'
        className='text-foreground absolute inset-y-1 right-1 z-10 h-auto w-10 px-0 peer-autofill:text-slate-900'
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        disabled={disabled}
        onClick={() => setIsVisible((previous) => !previous)}
      >
        {isVisible ? (
          <EyeOff className='size-4' aria-hidden='true' />
        ) : (
          <Eye className='size-4' aria-hidden='true' />
        )}
      </Button>
    </div>
  );
}
