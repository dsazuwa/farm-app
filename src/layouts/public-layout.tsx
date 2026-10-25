import type { ReactNode } from 'react';
import AppBar from '../components/layout/app-bar';
import Footer from '../components/layout/footer';

export default function PublicLayout({ children }: { children?: ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <AppBar className='px-[5%] py-5.5' />
      <main className='container mx-auto flex-1'>{children}</main>
      <Footer className='px-[5%] py-5.5' />
    </div>
  );
}
