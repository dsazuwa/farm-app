import { Outlet } from 'react-router';

import AppBar from '@/components/layout/app-bar';
import Footer from '@/components/layout/footer';

export default function PublicLayout() {
  return (
    <div className='flex min-h-screen flex-col'>
      <AppBar />

      <main className='container mx-auto flex-1'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
