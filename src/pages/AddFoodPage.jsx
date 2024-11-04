// src/pages/AddFoodPage.jsx

import React from 'react';
import AddFoodForm from '../components/AddFoodForm'; // Adjust the path if needed

const AddFoodPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Food Item</h1>
      <AddFoodForm />
    </div>
  );
};

export default AddFoodPage;
