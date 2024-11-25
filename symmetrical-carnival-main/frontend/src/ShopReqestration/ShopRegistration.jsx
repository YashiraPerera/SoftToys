import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

import BR from '../Image/design.png';
import { useNavigate } from 'react-router-dom';

const initialShop = {
  shopName: '',
  shopAddress: '',
  contactNumber: '',
  email: '',
};

const ShopRegistration = () => {
  const [shop, setShop] = useState(initialShop);
  const [message, setMessage] = useState(''); // Add a message state for feedback

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'shopName' && /\d/.test(value)) return; // Prevent numbers in shopName
    if (name === 'contactNumber' && /[a-zA-Z]/.test(value)) return; // Prevent letters in contactNumber
    setShop({ ...shop, [name]: value });
  };

  const validateShopName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const validateContactNumber = (number) => /^\d+$/.test(number);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Frontend validation
    if (!shop.shopName || !shop.shopAddress || !shop.contactNumber || !shop.email) {
      alert('Please fill in all fields.');
      return;
    }
    if (!validateShopName(shop.shopName)) {
      alert('Shop name should contain only letters.');
      return;
    }
    if (!validateContactNumber(shop.contactNumber)) {
      alert('Contact number should only contain numbers.');
      return;
    }
    if (!validateEmail(shop.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      // Send the shop data to your backend
      await axios.post('/api/shop', shop);
      setMessage('Shop registered successfully!');
      setShop(initialShop); // Reset form after successful submission
    } catch (error) {
      console.error('Error registering shop:', error);
      setMessage('Failed to register shop. Please try again.');
    }
  };

  const navigate = useNavigate();

  const handleViewShops = () => {
    navigate('/salesui/shoplist'); // Use navigate, not Navigate
  };

  return (
    <div
    className="bg-cover min-h-screen bg-no-repeat"
    style={{ backgroundImage: `url(${BR})` }} // Adding the background image
  >
    <div className="flex flex-col min-h-screen">
     
      <div
        className="flex-1 flex justify-center items-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url('/path/to/background-image.png')`, // Adjust your path here
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-xl w-full bg-pink-100 bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl p-10 border border-gray-200 space-y-6 z-10">
          <h2 className="text-4xl font-bold text-purple-600 mb-4 text-center">Shop Registration</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="shopName" className="block text-lg font-semibold text-gray-700">Shop Name</label>
              <input
                id="shopName"
                type="text"
                name="shopName"
                value={shop.shopName}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="shopAddress" className="block text-lg font-semibold text-gray-700">Shop Address</label>
              <input
                id="shopAddress"
                type="text"
                name="shopAddress"
                value={shop.shopAddress}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-lg font-semibold text-gray-700">Contact Number</label>
              <input
                id="contactNumber"
                type="text"
                name="contactNumber"
                value={shop.contactNumber}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={shop.email}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Register Shop
            </button>
          </form>

          {message && (
            <p className="text-center text-green-500 mt-4">{message}</p>
          )}

          <div className="text-center mt-6">
            <button
              onClick={handleViewShops}
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              View Shops
            </button>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default ShopRegistration;
