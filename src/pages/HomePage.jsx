import React from 'react';

const HomePage = () => {
  return (
    <div 
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D")', // Replace with your preferred background image URL
      }}
    >
      <div className="bg-black bg-opacity-50 text-white p-8 rounded-lg text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Divine World</h1>
        <p className="text-lg">Experience the best food from the comfort of your home!</p>
      </div>
    </div>
  );
};

export default HomePage;
