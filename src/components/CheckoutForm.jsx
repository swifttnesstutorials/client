// src/components/CheckoutForm.jsx
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    setLoading(true);
    setError(null);

    try {
      // Send amount to backend to create payment intent
      const response = await fetch('http://localhost:3000/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 }),
      });

      if (!response.ok) throw new Error("Failed to create payment intent");

      const { clientSecret } = await response.json();
      if (!clientSecret) throw new Error("No client secret returned from backend");

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      setLoading(false);
      if (error) {
        setError("Payment failed: " + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        navigate('/success');
      }
    } catch (error) {
      setLoading(false);
      setError("There was an error processing your payment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <CardElement className="border rounded p-2" />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        type="submit"
        disabled={loading || !stripe}
        className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 ${loading ? "opacity-50" : ""}`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
