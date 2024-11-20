// CheckoutPage.jsx
import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isDetailsConfirmed, setIsDetailsConfirmed] = useState(false); // New state for confirmation

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !address || !email || !phone) {
      alert('Please fill in all fields.');
      return;
    }
    // If all details are confirmed, set the confirmation state
    setIsDetailsConfirmed(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Confirm Details
        </button>
      </form>

      {isDetailsConfirmed && ( // Only show order summary and checkout form if details are confirmed
        <>
          <h2 className="text-xl">Order Summary</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="font-bold">
            Total: ₹{totalAmount.toFixed(2)}
          </div>

          <CheckoutForm clearCart={clearCart}totalAmount={totalAmount} /> {/* Pass totalAmount to CheckoutForm */}
        </>
      )}
    </div>
  );
};

export default CheckoutPage;