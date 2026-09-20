import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { syncThemeFromStorage } from '@/stores/theme';

import { App } from './App';

import './index.css';

syncThemeFromStorage();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
