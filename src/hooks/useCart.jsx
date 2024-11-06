// src/hooks/useCart.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Example logging to see initial state
  console.log('Cart state:', cart);

  const addToCart = (item) => {
    setCart((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        alert(`${item.name} is already in the cart!`);
        return prevItems; // Keep the current state if the item is already in the cart
      } else {
        return [...prevItems, { ...item, quantity: 1 }]; // Add item if not present in the cart
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateCartItemQuantity = (id, amount) => {
    setCart((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity }; // Prevents quantity from going below 1
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.error('useCart must be used within a CartProvider');
  }
  return context;
};