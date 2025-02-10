import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [email, setEmail] = useState(user.email || '');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setName(user.name || '');
    setPhone(user.phone || '');
    setEmail(user.email || '');

    // Fetch user's orders
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/orders?userId=${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      toast.error('Please fill all fields.');
      return;
    }

    const updatedUser = { name, phone, email };

    try {
      await updateUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile.');
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    try {
      const response = await fetch(`/orders/${orderId}/cancel`, { method: 'POST' });
      if (!response.ok) throw new Error('Cancellation failed');
      
      toast.success('Order canceled successfully!');
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      toast.error('Error canceling order.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" value={email} disabled className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100" />
        </div>
        <div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Update Profile
          </button>
        </div>
      </form>

      {/* Order List */}
      <h2 className="text-xl font-bold mt-6">Your Orders</h2>
      <div className="mt-4">
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-md mb-2 bg-gray-100">
              <p className="font-medium">Order #{order.id}</p>
              <p className="text-sm text-gray-600">Total: ₹{order.total}</p>
              <button
                onClick={() => handleCancelOrder(order.id)}
                className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Cancel Order
              </button>
            </div>
          ))
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
