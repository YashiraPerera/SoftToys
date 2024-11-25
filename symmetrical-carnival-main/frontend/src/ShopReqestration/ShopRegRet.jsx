import React, { useState, useEffect } from 'react';

import BR1 from '../Image/BR1.png';

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShop, setSelectedShop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editShop, setEditShop] = useState({});

  useEffect(() => {
    const fetchShops = async () => {
      const savedShops = JSON.parse(localStorage.getItem('shops')) || [];
      if (savedShops.length === 0) {
        const sampleShops = [
          {
            shopName: 'Cool Gadgets',
            shopAddress: '123 Tech Lane, Silicon Valley',
            contactNumber: '1234567890',
            email: 'info@coolgadgets.com',
          },
          {
            shopName: 'Book Haven',
            shopAddress: '456 Read St, Booktown',
            contactNumber: '9876543210',
            email: 'contact@bookhaven.com',
          },
          {
            shopName: 'Fashion Hub',
            shopAddress: '789 Style Ave, Galle',
            contactNumber: '5551234567',
            email: 'support@fashionhub.com',
          },
           {
            shopName: 'Fashion Hub',
            shopAddress: '789 Style Ave, Galle',
            contactNumber: '5551234567',
            email: 'support@fashionhub.com',
          },
        ];
        localStorage.setItem('shops', JSON.stringify(sampleShops));
        setShops(sampleShops);
      } else {
        setShops(savedShops);
      }
    };

    fetchShops();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewShop = (shop) => {
    setSelectedShop(shop);
    setIsModalOpen(true);
    setEditShop(shop);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShop(null);
    setEditShop({});
  };

  const handleDeleteShop = () => {
    const updatedShops = shops.filter((shop) => shop.email !== selectedShop.email);
    setShops(updatedShops);
    localStorage.setItem('shops', JSON.stringify(updatedShops));
    handleCloseModal();
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditShop((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    const updatedShops = shops.map((shop) =>
      shop.email === editShop.email ? editShop : shop
    );
    setShops(updatedShops);
    localStorage.setItem('shops', JSON.stringify(updatedShops));
    handleCloseModal();
  };

  const filteredShops = shops.filter((shop) =>
    shop.shopName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
    className="bg-cover min-h-screen bg-no-repeat"
    style={{ backgroundImage: `url(${BR1})` }} // Adding the background image
  >
    <div>
     
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Registered Shops</h2>

        <div className="mb-4">
          <input
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Search by Shop Name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {filteredShops.length > 0 ? (
          <div className="space-y-4">
            {filteredShops.map((shop, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-md">
                <div className="flex justify-between">
                  <h4 className="text-xl font-semibold">Shop {index + 1}</h4>
                  <button
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300"
                    onClick={() => handleViewShop(shop)}
                  >
                    View
                  </button>
                </div>
                <div className="mt-2">
                  <p>Name: {shop.shopName}</p>
                  <p>Address: {shop.shopAddress}</p>
                  <p>Contact: {shop.contactNumber}</p>
                  <p>Email: {shop.email}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No shops found.</p>
        )}

        {isModalOpen && selectedShop && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
              <h3 className="text-xl font-bold mb-4">Shop Details</h3>
              <input
                type="text"
                name="shopName"
                value={editShop.shopName}
                onChange={handleEditChange}
                placeholder="Shop Name"
                className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="shopAddress"
                value={editShop.shopAddress}
                onChange={handleEditChange}
                placeholder="Shop Address"
                className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="contactNumber"
                value={editShop.contactNumber}
                onChange={handleEditChange}
                placeholder="Contact Number"
                className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                name="email"
                value={editShop.email}
                onChange={handleEditChange}
                placeholder="Email"
                readOnly
                className="border border-gray-300 rounded-lg p-2 mb-4 w-full bg-gray-100"
              />
              <div className="flex justify-between">
                <button
                  className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition duration-300"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </button>
                <button
                  className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-300"
                  onClick={handleDeleteShop}
                >
                  Delete Shop
                </button>
                <button
                  className="bg-gray-300 text-black rounded-lg px-4 py-2 hover:bg-gray-400 transition duration-300"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
     
    </div>
  );
};

export default ShopList;