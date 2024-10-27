// src/pages/MenuPage.jsx
import React from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../hooks/useCart';


const MenuPage = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Burger',
      description: 'Delicious beef burger with fresh vegetables.',
      price: 90,
      image: 'https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?semt=ais_hybrid',
    },
    {
      id: 2,
      name: 'Pizza',
      description: 'Cheesy pizza topped with your choice of ingredients.',
      price: 250,
      image: 'https://cdn.pixabay.com/photo/2024/04/18/10/41/ai-generated-8704060_640.jpg',
    },
    {
      id: 3,
      name: 'Pasta',
      description: 'Creamy Alfredo pasta with grilled chicken.',
      price: 180,
      image: 'https://www.foodiecrush.com/wp-content/uploads/2020/05/Penne-Marinara-Sauce-foodiecrush.com-004.jpg',
    },
    {
      id: 4,
      name: 'Salad',
      description: 'Fresh garden salad with a variety of vegetables.',
      price: 120,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8hfZbY9fZTQs63IPou4OBJ4SDVDI4u8qziAq_kM076yNGlo1gz-RkyQC0Uq_MoY6607o&usqp=CAU',
    },
    {
      id: 5, 
      name: 'Tacos',
      description: 'Spicy beef tacos with fresh salsa and cheese.',
      price: 150,
      image: 'https://www.shutterstock.com/image-photo/healthy-simple-mexican-tacos-meat-260nw-2466683611.jpg',
    },
    {
      id: 6, 
      name: 'Sushi',
      description: 'Fresh sushi rolls with avocado and tuna.',
      price: 300,
      image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VzaGl8ZW58MHx8MHx8fDA%3D',
    },
  ];
    
  

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
      ))}
    </div>
  );
};

export default MenuPage;