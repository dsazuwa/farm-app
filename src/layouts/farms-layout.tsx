import { Outlet } from 'react-router';

import AppBar from '@/components/layout/app-bar';

export default function FarmsLayout() {
  return (
    <div className='flex min-h-screen flex-col'>
      <AppBar />

      <main className='container mx-auto flex-1 px-9'>
        <Outlet />
      </main>
    </div>
  );
}
