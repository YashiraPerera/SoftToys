import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

import BR1 from '../Image/design.png';
import logo from '../Image/logo.png';

const RetrieveCartPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/cart');
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to retrieve orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    try {
      console.log('Deleting order with ID:', id);
      const response = await axios.delete(`/api/cart/${id}`);
      console.log('Response from delete:', response);

      if (response.status === 200) {
        setOrders(orders.filter(order => order._id !== id));
      } else {
        console.error('Failed to delete order:', response.data);
        setError('Failed to delete order. Please try again later.');
      }
    } catch (err) {
      console.error('Error deleting order:', err);
      setError('Failed to delete order. Please try again later.');
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  const handleSaveEdit = async (updatedOrder) => {
    try {
      await axios.put(`/api/cart/${updatedOrder._id}`, updatedOrder);
      setOrders(orders.map(order => (order._id === updatedOrder._id ? updatedOrder : order)));
      setEditingOrder(null);
    } catch (err) {
      console.error('Error updating order:', err);
      setError('Failed to update order. Please try again later.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    // Add Logo
    doc.addImage(logo, 'PNG', 14, 10, 50, 20);
    // Add Title Next to Logo
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 51, 102);
    doc.text("Bear Works Lanka", 70, 20);
    // Draw Header Line
    doc.setDrawColor(0, 0, 0);
    doc.line(14, 32, doc.internal.pageSize.width - 14, 32);
    // Reset font for the report title
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Order Summary Report", 14, 50);
    // Prepare data for the table
    const tableData = orders.map(order => {
        return {
            shopName: order.shopName || 'N/A',
            shopAddress: order.shopAddress || 'N/A',
            discount: `Rs ${order.discount ? order.discount.toFixed(2) : '0.00'}`,
            products: order.products.map(product => {
                return `${product.name || 'Unknown Product'}: Rs ${(product.price ? product.price.toFixed(2) : '0.00')} x ${product.quantity || 0}`;
            }).join(', '),
        };
    });
    // Use autoTable to add a table with borders
    doc.autoTable({
        head: [['Shop Name', 'Shop Address', 'Discount', 'Products']],
        body: tableData.map(item => [
            item.shopName,
            item.shopAddress,
            item.discount,
            item.products
        ]),
        startY: 60,
        theme: 'striped',
        styles: {
            cellPadding: 5,
            fontSize: 12,
            lineWidth: 0.5,
            overflow: 'linebreak',
            halign: 'left',
            valign: 'middle',
        },
        headStyles: {
            fillColor: [0, 51, 102],
            textColor: [255, 255, 255],
            lineWidth: 1,
        },
        didParseCell: function (data) {
            const { cell } = data;
            cell.styles.lineColor = [0, 0, 0];
            cell.styles.lineWidth = 0.5;
        },
    });
    // Draw Footer Line
    const footerY = doc.internal.pageSize.height - 30;
    doc.line(14, footerY, doc.internal.pageSize.width - 14, footerY);
    // Add Footer
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    const footerText = "Address: Your Address Here\nContact: +94 123 456 789";
    const footerLines = doc.splitTextToSize(footerText, doc.internal.pageSize.width - 28);
    doc.text(footerLines, 14, footerY + 10);
    // Save the PDF
    doc.save('order_summary.pdf');
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => {
      const price = product.price || 0;
      const quantity = product.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter(order =>
    order.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-cover min-h-screen bg-no-repeat" style={{ backgroundImage: `url(${BR1})` }}>
     
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Retrieve Orders</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by shop name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        {filteredOrders.length === 0 ? (
          <p className="text-center">No orders found.</p>
        ) : (
          <div className="overflow-x-auto flex justify-center">
            <table className="min-w-[80%] table-auto border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Shop Name</th>
                  <th className="px-4 py-2 border">Shop Address</th>
                  <th className="px-4 py-2 border">Discount</th>
                  <th className="px-4 py-2 border">Products</th>
                  <th className="px-4 py-2 border">Total Price</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const totalPrice = calculateTotalPrice(order.products);
                  return (
                    <tr key={order._id} className="bg-white even:bg-gray-50">
                      <td className="px-4 py-2 border">{order.shopName || 'N/A'}</td>
                      <td className="px-4 py-2 border">{order.shopAddress || 'N/A'}</td>
                      <td className="px-4 py-2 border">Rs {order.discount ? order.discount.toFixed(2) : '0.00'}</td>
                      <td className="px-4 py-2 border">
                        <ul>
                          {order.products.map((product, index) => (
                            <li key={index}>
                              {product.name || 'Unknown Product'}: {product.quantity || 0}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-2 border">Rs {totalPrice.toFixed(2)}</td>
                      <td className="px-4 py-2 border">
                        <button
                          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                          onClick={() => handleEdit(order)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                          onClick={() => deleteOrder(order._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            onClick={generatePDF}
          >
            Generate PDF
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default RetrieveCartPage;
