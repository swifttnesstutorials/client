import React from 'react';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                <div>
                  <h3 className="text-xl">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleClearCart}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Clear Cart
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;