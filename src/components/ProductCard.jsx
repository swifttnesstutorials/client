import React from 'react';

// ProductCard Component
const ProductCard = ({ product, onAddToCart }) => {
  // Format the price using Intl.NumberFormat for Indian currency (INR)
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(product.price);

  return (
    <div className="border rounded-lg shadow-lg p-4">
      {/* Display product image */}
      <div className="mb-2">
        <img
          src={product.image} // Use the correct property name
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      </div>

      {/* Product details */}
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      
      {/* Price and Add to Cart Button */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-semibold">{formattedPrice}</span>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
