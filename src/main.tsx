import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/layout/layout.tsx';
import { ThemeProvider } from './hooks/theme-context.tsx';
import './index.css';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Layout></Layout>
    </ThemeProvider>
  </StrictMode>,
);
