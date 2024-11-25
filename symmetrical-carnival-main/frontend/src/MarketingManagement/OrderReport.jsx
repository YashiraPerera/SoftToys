import React from 'react';

const OrderReport = ({ cartItems, orderDetails }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Order Report</h2>

      {/* Shop Details */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Shop Details</h3>
        <p><strong>Shop Name:</strong> {orderDetails.name}</p>
        <p><strong>Shop Address:</strong> {orderDetails.address}</p>
        <p><strong>Phone Number:</strong> {orderDetails.phoneNumber}</p>
        <p><strong>Order Date:</strong> {orderDetails.date}</p>
      </div>

      {/* Cart Items */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Cart Items</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border-b">Item</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Price</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Quantity</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-2" />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
                <td className="py-2 px-4 border-b">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Total Summary</h3>
        <p><strong>Subtotal:</strong> ${calculateTotal().toFixed(2)}</p>
        <p><strong>Tax (8%):</strong> ${(calculateTotal() * 0.08).toFixed(2)}</p>
        <p className="text-lg font-bold"><strong>Total:</strong> ${(calculateTotal() + calculateTotal() * 0.08).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderReport;
