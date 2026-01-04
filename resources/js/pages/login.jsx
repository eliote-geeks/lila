import React from 'react';
import { createRoot } from 'react-dom/client';
import LoginPage from './LoginPage.jsx';

const el = document.getElementById('app');
if (el) {
  createRoot(el).render(<LoginPage />);
}
