// src/pages/RestaurantPage.jsx
import React from 'react';

const RestaurantPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Restaurant!</h1>
      <p className="mb-4">
        We offer a wide variety of delicious dishes prepared with the freshest ingredients. Our chefs are dedicated to providing you with the best dining experience possible.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Specialties:</h2>
      <ul className="list-disc list-inside">
        <li>Burgers: Juicy and flavorful</li>
        <li>Pizzas: Made with fresh dough and toppings</li>
        <li>Pastas:Creamy Alfredo pasta with grilled chicken</li>
        <li>Salads:Fresh garden salad with a variety of vegetables</li>
        <li>Tacos:Spicy beef tacos with fresh salsa and cheese</li>
        <li>Sushis:Fresh sushi rolls with avocado and tuna</li>
      </ul>
      <p className="mt-4">Join us for a delightful meal and experience the warmth of our hospitality.</p>
    </div>
  );
};

export default RestaurantPage;
