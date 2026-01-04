import React from 'react';
import { createRoot } from 'react-dom/client';
import RegisterPage from './RegisterPage.jsx';

const el = document.getElementById('app');
if (el) {
  createRoot(el).render(<RegisterPage />);
}
