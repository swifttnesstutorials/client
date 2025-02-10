// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

// Define available coupons
const availableCoupons = {
  DISCOUNT10: 10, // 10% discount
  SAVE20: 20, // 20% discount
};

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateCartItemQuantity } = useCart();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const handleQuantityChange = (id, amount) => {
    updateCartItemQuantity(id, amount);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to your cart before checking out.');
    } else {
      navigate('/checkout');
    }
  };

  // Calculate Total Price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedPrice = totalPrice - discount;

  // Apply Coupon Code
  const applyCoupon = () => {
    if (availableCoupons[coupon]) {
      setDiscount(totalPrice * (availableCoupons[coupon] / 100));
      setIsCouponApplied(true);
    } else {
      alert('Invalid Coupon Code');
      setDiscount(0);
      setIsCouponApplied(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/031/617/287/small_2x/composition-of-shopping-day-concept-with-shopping-bags-paper-bags-and-copy-space-shopping-days-concept-by-ai-generated-free-photo.jpg')" }}>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 bg-opacity-90">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Your cart is currently empty.</p>
            <button onClick={() => navigate('/menu')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Browse Menu
            </button>
          </div>
        ) : (
          <div>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4">
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      ₹{item.price.toFixed(2)} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 disabled:opacity-50">-</button>
                    <span className="bg-gray-200 text-gray-800 px-4 py-1 rounded">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">+</button>
                    <button onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Coupon Section */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Have a Coupon?</h3>
              <div className="flex mt-2">
                <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="border rounded-l px-4 py-2 w-full"
                  disabled={isCouponApplied} />
                <button onClick={applyCoupon}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-r ${
                    isCouponApplied ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                  disabled={isCouponApplied}>
                  {isCouponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {isCouponApplied && (
                <p className="text-green-600 mt-2">Coupon applied! {availableCoupons[coupon]}% discount applied.</p>
              )}
            </div>

            {/* Total Price */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">Total: ₹{totalPrice.toFixed(2)}</h3>
              {isCouponApplied && (
                <h3 className="text-xl font-semibold text-green-600">Discounted Total: ₹{discountedPrice.toFixed(2)}</h3>
              )}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button onClick={clearCart} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
                Clear Cart
              </button>
              <button onClick={handleCheckout} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
