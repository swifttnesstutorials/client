// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RestaurantPage from './pages/RestaurantPage';
import PaymentPage from './pages/PaymentPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';



const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar will be rendered once here */}
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/restaurant" element={<RestaurantPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </main>
      {/* Footer will be rendered once here */}
      <Footer />
    </div>
  );
};

export default App;
