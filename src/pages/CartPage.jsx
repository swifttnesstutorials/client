// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../hooks/useCart';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{item.name} - ₹{item.price.toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={clearCart}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
