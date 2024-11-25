import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const ReportPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/cart'); // Adjust the endpoint as necessary
        setOrders(response.data);
      } catch (err) {
        setError('Failed to retrieve orders. Please try again later.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const generateChartData = () => {
    const labels = orders.map(order => order.shopName || 'N/A');
    const totalPrices = orders.map(order => {
      const totalPrice = order.products.reduce((total, product) => {
        const price = product.price || 0;
        const quantity = product.quantity || 0;
        return total + (price * quantity);
      }, 0);
      return totalPrice;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Total Price per Order',
          data: totalPrices,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const lineChartData = {
    labels: orders.map((_order, index) => `Order ${index + 1}`),
    datasets: [
      {
        label: 'Discount over Orders',
        data: orders.map(order => order.discount || 0),
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
      },
    ],
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-pink-50 min-h-screen">
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-600">Order Report</h1>
        <div className="flex flex-col md:flex-row justify-around mb-6">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4 text-center text-pink-600">Bar Chart - Total Price per Order</h2>
            <Bar data={generateChartData()} options={{ responsive: true }} />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-center text-pink-600">Line Chart - Discount over Orders</h2>
            <Line data={lineChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default ReportPage;
