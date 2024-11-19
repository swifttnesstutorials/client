// src/components/CheckoutForm.jsx
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart'; // Import useCart hook


const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    setLoading(true);
    setError(null);

    try {
      // Send the amount to the backend to create the Payment Intent
      const response = await fetch('https://client-server-18.onrender.com/payments/create-payment-intent', {
     
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }), // Amount in INR
      });

      if (!response.ok) throw new Error("Failed to create payment intent");

      const { clientSecret } = await response.json();
      if (!clientSecret) throw new Error("No client secret returned from backend");

      // Confirm the payment on the client side using the Stripe client secret
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      setLoading(false);
      if (error) {
        setError("Payment failed: " + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        clearCart(); // Clear the cart after payment success
        navigate('/success'); // Redirect to success page
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
