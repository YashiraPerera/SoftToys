import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Import Axios

import BR from '../Image/BR1.png'; // Ensure the image is placed in the assets folder
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState({
    products: [
      { id: 1, name: 'Bear', price: 4000.00, quantity: 5 },
      { id: 2, name: 'Bear with Heart', price: 950.00, quantity: 10 },
      { id: 3, name: 'Bunny Rabbit', price: 1050.00, quantity: 5 },
      { id: 4, name: 'Dalmatian', price: 1000.00, quantity: 10 },
      { id: 5, name: 'Dog', price: 800.00, quantity: 10 },
    ],
    shopName: '',
    shopAddress: '',
  });

  const [orderDate, setOrderDate] = useState('');
  const [promotions] = useState([
    { id: 1, name: 'Summer Sale', discount: 100 },
    { id: 2, name: 'Black Friday', discount: 200 },
    { id: 3, name: 'New Year Special', discount: 500 },
  ]);
  const [selectedPromotionId, setSelectedPromotionId] = useState(0);

  const shops = [
    { name: 'Cool Gadgets', address: '123 Tech Lane, Silicon Valley' },
    { name: 'Book Haven', address: '456 Read St, Booktown' },
    { name: 'Fashion Hub', address: '789 Style Ave, Galle' },
    { name: 'Kids', address: 'New World Market, Colombo 11'},
    { name: 'Baby Care', address: '75, Dutugemunu St, Colombo'},
  ];

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setOrderDate(currentDate);
  }, []);

  const handleQuantityChange = useCallback((id, quantity) => {
    setCart(prevCart => ({
      ...prevCart,
      products: prevCart.products.map(product =>
        product.id === id ? { ...product, quantity: Math.max(quantity, 1) } : product
      ),
    }));
  }, []);

  const handleRemoveProduct = useCallback((id) => {
    setCart(prevCart => ({
      ...prevCart,
      products: prevCart.products.filter(product => product.id !== id),
    }));
  }, []);

  const handleShopChange = useCallback((e) => {
    const selectedShop = shops.find(shop => shop.name === e.target.value);
    setCart(prevCart => ({
      ...prevCart,
      shopName: selectedShop ? selectedShop.name : '',
      shopAddress: selectedShop ? selectedShop.address : '',
    }));
  }, [shops]);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    const orderItems = cart.products.map(product => ({
      name: product.name,
      quantity: product.quantity,
      price: applyPromotion(product.price),
      totalPrice: (applyPromotion(product.price) * product.quantity).toFixed(2),
    }));

    const subtotal = cart.products
      .reduce((acc, product) => acc + applyPromotion(product.price) * product.quantity, 0)
      .toFixed(2);

    const discount = promotions.find(promo => promo.id === selectedPromotionId)?.discount || 0;

    const totalAmount = (subtotal - discount).toFixed(2);

    const orderDetails = {
      products: orderItems,
      shopName: cart.shopName,
      shopAddress: cart.shopAddress,
      total: totalAmount,
      discount,
    };

    try {
      const response = await axios.post('/api/cart', orderDetails);
      if (response.status === 201) {
        alert('Order submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order.');
    }
  };

  const handlePromotionChange = (e) => {
    setSelectedPromotionId(parseInt(e.target.value, 10));
  };

  const applyPromotion = (price) => {
    const selectedPromotion = promotions.find(promo => promo.id === selectedPromotionId);
    return selectedPromotion ? price - selectedPromotion.discount : price;
  };

  const subtotal = cart.products
    .reduce((acc, product) => acc + applyPromotion(product.price) * product.quantity, 0)
    .toFixed(2);

  const discount = promotions.find(promo => promo.id === selectedPromotionId)?.discount || 0;

  const navigate = useNavigate();

  const handleViewOrders = () => {
    navigate('/cartRet'); // Use navigate, not Navigate
  };

  return (
    <div
      className="bg-cover min-h-screen bg-no-repeat"
      style={{ backgroundImage: `url(${BR})` }} // Adding the background image
    >
      
      <div className="container mx-auto py-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Cart</h1>
        <p className="text-gray-200 text-center mb-4">Order Date: {orderDate}</p>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg" onSubmit={handleSubmitOrder}>
          <div className="mb-4">
            <label className="block text-gray-700 text-size-12 font-bold mb-2 ">Shop Name:</label>
            <select
              value={cart.shopName}
              onChange={handleShopChange}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Select Shop</option>
              {shops.map(shop => (
                <option key={shop.name} value={shop.name}>
                  {shop.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-size-12 font-bold mb-2">Shop Address:</label>
            <input
              type="text"
              value={cart.shopAddress}
              readOnly
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-size-12 font-bold mb-2">Select Promotion:</label>
            <select
              value={selectedPromotionId}
              onChange={handlePromotionChange}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="0">None</option>
              {promotions.map(promo => (
                <option key={promo.id} value={promo.id}>
                  {promo.name} - Rs{promo.discount}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transform hover:scale-105 transition duration-300"
          >
            Submit Order
          </button>
        </form>

        <div className="w-full max-w-6xl">
          <table className="min-w-full bg-white shadow-md rounded mx-auto border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-100 hover:bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Product</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Total</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.products.map(product => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">Rs{applyPromotion(product.price).toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={e => handleQuantityChange(product.id, parseInt(e.target.value))}
                      className="border rounded w-20 px-2"
                      min="1"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Rs{(applyPromotion(product.price) * product.quantity).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transform hover:scale-105"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 w-full max-w-lg flex flex-col ">
          <h2 className="text-2xl font-bold  mb-4">Order Summary</h2>
          <p className="text-gray-700">Subtotal: Rs{subtotal}</p>
          <p className="text-gray-700">Discount: Rs{discount}</p>
          <p className="text-xl font-bold">Total: Rs{(subtotal - discount).toFixed(2)}</p>

          <div className="mt-4 flex space-x-4">

            <button
              onClick={handleViewOrders}
              className="bg-blue-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition duration-300 ease-in-out shadow-lg"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default CartPage;