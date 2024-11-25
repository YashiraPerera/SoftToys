import React, { useState } from 'react';

import BR from '../Image/design.png'; 

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([
    { id: 1, name: 'Summer Sale', description: '10% off all products', discount: 10, startDate: '2024-06-01', endDate: '2024-09-30' },
    { id: 2, name: 'Black Friday', description: '20% off all products', discount: 20, startDate: '2024-11-25', endDate: '2024-11-27' },
    { id: 3, name: 'New Year', description: '10% off all products', discount: 10, startDate: '2024-04-10', endDate: '2024-04-20' },
  ]);

  const [newPromotion, setNewPromotion] = useState({ name: '', description: '', discount: '', startDate: '', endDate: '' });
  const [editing, setEditing] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPromotion = () => {
    if (newPromotion.startDate && newPromotion.endDate && newPromotion.startDate < newPromotion.endDate) {
      const newId = promotions.length ? Math.max(...promotions.map(p => p.id)) + 1 : 1;
      const newPromo = { ...newPromotion, id: newId };

      setPromotions([...promotions, newPromo]);
      setNewPromotion({ name: '', description: '', discount: '', startDate: '', endDate: '' });
      setError('');
    } else {
      setError('Start date must be earlier than end date.');
    }
  };

  const handleEditPromotion = (promotion) => {
    setEditing(true);
    setSelectedPromotion({ ...promotion });
  };

  const handleUpdatePromotion = () => {
    if (selectedPromotion.startDate && selectedPromotion.endDate && selectedPromotion.startDate < selectedPromotion.endDate) {
      const updatedPromotions = promotions.map((promotion) =>
        promotion.id === selectedPromotion.id ? selectedPromotion : promotion
      );
      setPromotions(updatedPromotions);
      setEditing(false);
      setSelectedPromotion(null);
      setError('');
    } else {
      setError('Start date must be earlier than end date.');
    }
  };

  const handleDeletePromotion = (id) => {
    const updatedPromotions = promotions.filter((promotion) => promotion.id !== id);
    setPromotions(updatedPromotions);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;

    // Only allow letters and spaces in the input
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');

    setNewPromotion({ ...newPromotion, name: filteredValue });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPromotions = promotions.filter(promotion =>
    promotion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="bg-cover min-h-screen bg-no-repeat"
      style={{ backgroundImage: `url(${BR})` }}
    >
      <div>
       
        <div className="max-w-[1200px] mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Promotion Management</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="w-full">
              <input
                type="text"
                value={newPromotion.name}
                onChange={handleNameChange}
                placeholder="Promotion Name"
                className="w-full p-2 text-sm text-gray-600 rounded border border-gray-300 outline-none"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                value={newPromotion.description}
                onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                placeholder="Promotion Description"
                className="w-full p-2 text-sm text-gray-600 rounded border border-gray-300 outline-none"
              />
            </div>
            <div className="w-full">
              <input
                type="number"
                value={newPromotion.discount}
                onChange={(e) => setNewPromotion({ ...newPromotion, discount: parseInt(e.target.value, 10) })}
                placeholder="Discount"
                className="w-full p-2 text-sm text-gray-600 rounded border border-gray-300 outline-none"
              />
            </div>
            <div className="w-full">
              <input
                type="date"
                value={newPromotion.startDate}
                onChange={(e) => setNewPromotion({ ...newPromotion, startDate: e.target.value })}
                className="w-full p-2 text-sm text-gray-600 rounded border border-gray-300 outline-none"
              />
            </div>
            <div className="w-full">
              <input
                type="date"
                value={newPromotion.endDate}
                onChange={(e) => setNewPromotion({ ...newPromotion, endDate: e.target.value })}
                className="w-full p-2 text-sm text-gray-600 rounded border border-gray-300 outline-none"
              />
            </div>
            <button onClick={handleAddPromotion} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transform hover:scale-105">
              Add Promotion
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Promotions"
              className="w-full p-2 text-sm text-gray-600 rounded border border-gray-300 outline-none"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 bg-gray-100 text-left">Name</th>
                  <th className="p-2 bg-gray-100 text-left">Description</th>
                  <th className="p-2 bg-gray-100 text-left">Discount</th>
                  <th className="p-2 bg-gray-100 text-left">Start Date</th>
                  <th className="p-2 bg-gray-100 text-left">End Date</th>
                  <th className="p-2 bg-gray-100 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPromotions.map((promotion) => (
                  <tr key={promotion.id}>
                    <td className="p-2 border-b">{promotion.name}</td>
                    <td className="p-2 border-b">{promotion.description}</td>
                    <td className="p-2 border-b">{promotion.discount}%</td>
                    <td className="p-2 border-b">{promotion.startDate}</td>
                    <td className="p-2 border-b">{promotion.endDate}</td>
                    <td className="p-2 border-b">
                      <button onClick={() => handleEditPromotion(promotion)} className="bg-yellow-400 text-white font-bold py-2 px-4 rounded mr-2 hover:bg-yellow-500 transform hover:scale-105">
                        Edit
                      </button>
                      <button onClick={() => handleDeletePromotion(promotion.id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transform hover:scale-105">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editing && selectedPromotion && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-4">Edit Promotion</h2>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="w-full">
                  <input
                    type="text"
                    value={selectedPromotion.name}
                    onChange={(e) => setSelectedPromotion({ ...selectedPromotion, name: e.target.value })}
                    className="w-full p-2 text-sm text-gray-600 rounded border border-gray-300 outline-none"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    value={selectedPromotion.description}
                    onChange={(e) => setSelectedPromotion({ ...selectedPromotion, description: e.target.value })}
                    className="w-full p-2 text-sm text-gray-600 rounded border border-gray-300 outline-none"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="number"
                    value={selectedPromotion.discount}
                    onChange={(e) => setSelectedPromotion({ ...selectedPromotion, discount: parseInt(e.target.value, 10) })}
                    className="w-full p-2 text-sm text-gray-600 rounded border border-gray-300 outline-none"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="date"
                    value={selectedPromotion.startDate}
                    onChange={(e) => setSelectedPromotion({ ...selectedPromotion, startDate: e.target.value })}
                    className="w-full p-2 text-sm text-gray-600 rounded border border-gray-300 outline-none"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="date"
                    value={selectedPromotion.endDate}
                    onChange={(e) => setSelectedPromotion({ ...selectedPromotion, endDate: e.target.value })}
                    className="w-full p-2 text-sm text-gray-600 rounded border border-gray-300 outline-none"
                  />
                </div>
                <button onClick={handleUpdatePromotion} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transform hover:scale-105">
                  Update Promotion
                </button>
              </div>
            </div>
          )}
        </div>
       
      </div>
    </div>
  );
};

export default PromotionManagement;
