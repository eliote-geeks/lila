import React from 'react';
import { createRoot } from 'react-dom/client';
import ProfilePage from './ProfilePage.jsx';

const el = document.getElementById('app');
if (el) {
  const app = window.CamerHub || {};
  const onLogout = app.onLogout || (() => {
    const form = document.getElementById('logout-form');
    if (form) form.submit();
  });
  createRoot(el).render(<ProfilePage user={app.user} onLogout={onLogout} />);
}
