import React from 'react';
import { createRoot } from 'react-dom/client';
import Gallery from './Gallery';
import './styles.css';

const el = document.getElementById('gt-root');
if (el) createRoot(el).render(<React.StrictMode><Gallery /></React.StrictMode>);
