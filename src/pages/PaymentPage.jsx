import React, { useState, useEffect } from 'react';

const PaymentPage = ({ total = 0, placeOrder = () => alert('Order placed!') }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    console.log('PaymentPage rendered');
    console.log('Total:', total);
    console.log('Place Order Function:', placeOrder);
  }, [total, placeOrder]);

  const handlePayment = () => {
    if (cardNumber && expiry && cvv) {
      placeOrder();
      alert('Payment Successful!');
    } else {
      alert('Please fill in all payment details');
    }
  };

  

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Payment Details</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="XXXX XXXX XXXX XXXX"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Total Amount: ₹{total.toFixed(2)}</h2>
        <button
          type="button"
          onClick={handlePayment}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Make Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
