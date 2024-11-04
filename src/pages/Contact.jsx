import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold text-center mb-4">Contact Us</h1>
      <p className="text-center mb-2">We’d love to hear from you! Reach out to us through the contact details below.</p>
      
      <div className="mt-4">
        <p className="text-lg font-medium">Email:</p>
        <p className="text-gray-700">contact@spicygummies.com</p>
      </div>
      
      <div className="mt-4">
        <p className="text-lg font-medium">Phone:</p>
        <p className="text-gray-700">+1 (123) 456-7890</p>
      </div>

      <div className="mt-4">
        <p className="text-lg font-medium">Address:</p>
        <p className="text-gray-700">123 Food Street, Flavor Town, FT 12345</p>
      </div>
    </div>
  );
};

export default Contact;
