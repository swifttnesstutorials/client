// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './index.css'; // Tailwind CSS styles

const stripePromise = loadStripe('pk_test_51QHozPIiBslsh4IXDmTjxvQOo8fDpLxXuEO5ugRYl8ATKvRNqvjfvC7guXg01OdzkOA3n2Sl5BjSxw2DYDz2yoiO00MH0wekyg');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
