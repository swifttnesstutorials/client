// src/components/AddFoodForm.jsx

import React, { useState } from 'react';

const AddFoodForm = () => {
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the logic to save the food item
    console.log('Food Added:', { foodName, foodDescription, foodPrice });
    // Reset the form after submission
    setFoodName('');
    setFoodDescription('');
    setFoodPrice('');
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        placeholder="Food Name"
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={foodDescription}
        onChange={(e) => setFoodDescription(e.target.value)}
        placeholder="Food Description"
        required
        className="border p-2 w-full"
      />
      <input
        type="number"
        value={foodPrice}
        onChange={(e) => setFoodPrice(e.target.value)}
        placeholder="Food Price"
        required
        className="border p-2 w-full"
      />
      
      <button type="submit" className="bg-blue-500 text-white p-2">
        Add Food
      </button>
    </form>
  );
};

export default AddFoodForm;
