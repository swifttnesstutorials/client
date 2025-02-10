// src/components/CheckoutForm.jsx
import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(totalAmount);
  const [message, setMessage] = useState("");

  // Fetch Payment Intent & Apply Discount
  const fetchPaymentIntent = async (amount, coupon = "") => {
    try {
      const response = await fetch('https://client-server-20.onrender.com/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount * 100, couponCode: coupon }),
      });

      if (!response.ok) throw new Error("Failed to create payment intent");

      const data = await response.json();
      setClientSecret(data.clientSecret);
      setDiscountedAmount(data.finalAmount / 100); // Convert from paise/cents to ₹
      setMessage(coupon ? "✅ Coupon applied successfully!" : "");
    } catch (error) {
      setMessage("❌ Invalid coupon code or failed to apply discount.");
    }
  };

  useEffect(() => {
    fetchPaymentIntent(totalAmount);
  }, [totalAmount]);

  // Apply Coupon
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    fetchPaymentIntent(totalAmount, couponCode);
  };

  // Handle Payment
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    setLoading(true);
    setError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      setLoading(false);
      if (error) {
        setError("❌ Payment failed: " + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        placeOrder(paymentIntent.id);
      }
    } catch (error) {
      setLoading(false);
      setError("❌ Error processing payment. Please try again.");
    }
  };

  const placeOrder = async (paymentId) => {
    try {
      const amountToSend = discountedAmount > 0 ? discountedAmount * 100 : totalAmount * 100;
      console.log("🔍 Sending Final Amount to Backend:", amountToSend);  // Debugging
  
      await fetch('https://client-server-20.onrender.com/payments/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: JSON.parse(localStorage.getItem("cart")) || [],
          finalAmount: amountToSend,
          paymentId,
          couponCode
        }),
      });
  
      clearCart();
      navigate('/success', { state: { amount: amountToSend } });  // ✅ Ensure amount is passed
    } catch (error) {
      setError("❌ Order placement failed.");
    }
  };
  
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      {/* Coupon Code Input */}
      <label className="block mb-2">Apply Coupon Code:</label>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="border p-2 flex-grow"
        />
        <button 
          onClick={handleApplyCoupon} 
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Apply
        </button>
      </div>

      {message && <p className="text-green-500 mb-2">{message}</p>}
      
      {/* Final Amount Display */}
      <h3 className="text-lg font-medium">
        Final Amount: <span className="text-green-600 font-bold">₹{discountedAmount}</span>
      </h3>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <CardElement className="border p-3 rounded-md" />
        <button 
          type="submit"
          disabled={loading || !stripe}
          className="w-full mt-4 bg-green-500 text-white py-2 rounded disabled:bg-gray-300"
        >
          {loading ? "Processing..." : `Pay ₹${discountedAmount}`}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default CheckoutForm;
