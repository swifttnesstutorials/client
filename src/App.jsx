// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';
import AddFoodPage from './pages/AddFoodPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutForm from './components/CheckoutForm';
import PaymentSuccess from './pages/PaymentSuccess';
import EditProfilePage from './pages/EditProfilePage'; 

const stripePromise = loadStripe('pk_test_51QHozPIiBslsh4IXDmTjxvQOo8fDpLxXuEO5ugRYl8ATKvRNqvjfvC7guXg01OdzkOA3n2Sl5BjSxw2DYDz2yoiO00MH0wekyg'); // Replace with your Publishable Key

const App = () => (
  <Elements stripe={stripePromise}>
    <Router>
    <AuthProvider> {/* Wrap entire app in AuthProvider */}
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/add-food" element={<AddFoodPage />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/edit-profile" element={<EditProfilePage />} /> 
            
          </Routes>

          <Footer />
        </div>
      </CartProvider>
      </AuthProvider>
    </Router>
  </Elements>
);

export default App;