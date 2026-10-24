import type { ReactNode } from 'react';
import AppBar from './app-bar';
import Footer from './footer';

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <AppBar className='px-[5%] py-5.5' />
      <main className='container mx-auto flex-1'>{children}</main>
      <Footer className='px-[5%] py-5.5' />
    </div>
  );
}
