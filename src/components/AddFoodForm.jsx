// src/components/AddFoodForm.jsx

import React, { useState } from 'react';

const AddFoodForm = () => {
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodImage, setFoodImage] = useState(null); // To store the uploaded image file

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('foodName', foodName);
    formData.append('foodDescription', foodDescription);
    formData.append('foodPrice', foodPrice);
    if (foodImage) formData.append('foodImage', foodImage);

    // Logic to send the form data (including image) to the backend
    console.log('Food Added:', { foodName, foodDescription, foodPrice, foodImage });
    
    // Reset the form after submission
    setFoodName('');
    setFoodDescription('');
    setFoodPrice('');
    setFoodImage(null);
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
      
      {/* Image upload input */}
      <div>
        <label className="block">Food Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="border p-2 w-full"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2">
        Add Food
      </button>
    </form>
  );
};

export default AddFoodForm;