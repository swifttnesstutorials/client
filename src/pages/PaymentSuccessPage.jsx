import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Navigate to the home page after payment success
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center p-4 border rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Payment Successful!</h2>
        <p className="mb-4">Thank you for your purchase. Your payment was successful.</p>
        <button
          onClick={handleRedirect}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
