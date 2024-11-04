// src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-center mb-4">About Us</h1>
      
      <p className="mb-4">
        Welcome to Spicy Gummies, your go-to destination for delicious and quality food delivered right to your door. Our mission is to provide the best culinary experience, making it convenient for you to enjoy your favorite meals.
      </p>
      
      <p className="mb-4">
        Our team consists of passionate food lovers dedicated to sourcing fresh ingredients and preparing meals that satisfy your cravings. We believe that good food brings people together, and we strive to create memorable dining experiences for our customers.
      </p>
      
      <h2 className="text-xl font-semibold mb-2">Our Values</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Quality: We prioritize high-quality ingredients and culinary excellence.</li>
        <li>Customer Satisfaction: Your satisfaction is our top priority.</li>
        <li>Community: We support local farmers and businesses to bring you the freshest produce.</li>
      </ul>

      <p className="mb-4">
        Thank you for choosing Spicy Gummies. We look forward to serving you!
      </p>
    </div>
  );
};

export default About;
