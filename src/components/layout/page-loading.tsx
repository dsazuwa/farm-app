import { LoaderCircle } from 'lucide-react';

import Brand from '@/components/brand';

type PageLoadingProps = {
  message?: string;
};

export default function PageLoading({
  message = 'Loading page…',
}: PageLoadingProps) {
  return (
    <main className='flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12'>
      <Brand />

      <div role='status' className='flex items-center gap-2'>
        <LoaderCircle
          className='text-primary size-5 animate-spin'
          aria-hidden='true'
        />

        <p className='text-muted-foreground text-sm'>{message}</p>
      </div>
    </main>
  );
}
