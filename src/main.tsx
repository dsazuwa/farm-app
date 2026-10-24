import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Layout from './components/layout/layout.tsx';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <Layout></Layout>
  </StrictMode>,
);
