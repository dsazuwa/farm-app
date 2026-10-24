import type { ReactNode } from 'react';
import AppBar from './app-bar';
import Footer from './footer';

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <AppBar />
      <main className='container mx-auto flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
