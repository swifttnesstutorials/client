import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ensure amount is properly retrieved
  const amount = location.state?.amount !== undefined ? location.state.amount / 100 : "Unknown";

  const handleBackToHome = () => {
    navigate('/'); // Redirect to the homepage
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-gray-700">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful! 🎉</h1>
      <p className="text-lg text-center mb-6">
        Thank you for your order! Your payment of <strong>₹{amount}</strong> has been processed successfully.
        <br />
        You will receive a confirmation email shortly.
      </p>
      <button
        onClick={handleBackToHome}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
