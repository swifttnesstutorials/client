// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateCartItemQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id, amount) => {
    updateCartItemQuantity(id, amount);
  };
  // Log to see if the cart is populated
  console.log('Cart content:', cart);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to your cart before checking out.');
    } else {
      navigate('/checkout'); // Redirect to the checkout page
    }
  };

  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-2">
                <span>
                  {item.name} - ₹{item.price.toFixed(2)} x {item.quantity}
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => updateCartItemQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItemQuantity(item.id, 1)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <button
            onClick={clearCart}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
        
