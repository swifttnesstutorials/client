// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Tailwind CSS styles
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
      <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
