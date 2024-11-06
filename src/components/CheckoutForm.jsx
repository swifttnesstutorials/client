// src/components/CheckoutForm.jsx
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    setLoading(true);

    try {
      // Send amount to the backend to create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Convert amount to smallest unit (cents)
      });

      const { clientSecret } = await response.json();

      // Confirm the card payment with the client secret from the backend
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      setLoading(false);

      if (error) {
        // Handle payment failure (for example, display error message)
        console.error(error.message);
        alert('Payment failed: ' + error.message);
      } else if (paymentIntent.status === 'succeeded') {
         // Redirect to the home page after successful payment
         navigate('/');
        
      }

    } catch (error) {
      setLoading(false);
      console.error('Payment error:', error);
      alert('payment successfully.');
      navigate('/');            // Redirect to the Home page 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <CardElement className="border rounded p-2" />
      <button
        type="submit"
        disabled={loading || !stripe}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;