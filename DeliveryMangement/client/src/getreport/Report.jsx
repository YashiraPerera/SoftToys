import React, { useEffect, useState } from 'react';
import './Report.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import 'jspdf-autotable'; // For adding table to PDF


const Report = () => {
  const [listData, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/Report/list');
        setData(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const deleteReport = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/Report/delete/${id}`)
      .then((response) => {
        setData(listData.filter((list) => list._id !== id));
        toast.success(response.data.message, { position: 'top-right' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title to the PDF
    doc.text('Delivery Report', 14, 10);

    // Define table columns and rows
    const tableColumn = ['Delivery No', 'Driver Name', 'Vehicle No', 'Delivery Route', 'Delivery Date', 'Start Time', 'End Time', 'Delivery Status'];
    const tableRows = listData.map((list, index) => [
      index + 1,
      list.driver_Name,
      list.vehicel_No,
      list.delivery_Route,
      list.delivery_Date,
      list.delivery_StartTime,
      list.delivery_EndTime,
      list.delivery_Status,
    ]);

    // Add table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // Adjust the starting point of the table
    });

    // Save the generated PDF
    doc.save('DeliveryReport.pdf');
  };

  // Filter listData based on the search term
  const filteredData = listData.filter((list) =>
    list.driver_Name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by driver name
  );

  

  return (
    <div className="deliverytable">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Driver Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="form-control"
        />
      </div>

      <button>
        <Link to="/add" type="add button" className="btn btn-primary">
          <i className="fa-solid fa-plus"></i> Add Report
        </Link>
      </button>

      <button>
        <Link to="/dashBoard" type="update button" className="btn btn-primary">
          <i className="fa-solid fa-pen-to-square"></i> Dash Board
        </Link>
      </button>

      <button>
        <Link to="/map" type="map button" className="btn btn-primary">
          <i className="fa-solid fa-map-location-dot"></i> Map View
        </Link>
      </button>

      

      <button onClick={generatePDF} type="button" className="btn btn-success">
        <i className="fa-solid fa-file-pdf"></i> Generate Report
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Delivery No</th>
            <th scope="col">Driver Name</th>
            <th scope="col">Vehicle No</th>
            <th scope="col">Delivery Route</th>
            <th scope="col">Delivery Date</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Delivery Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((list, index) => (
            <tr key={list._id}>
              <th scope="row">{index + 1}</th>
              <td>{list.driver_Name}</td>
              <td>{list.vehicel_No}</td>
              <td>{list.delivery_Route}</td>
              <td>{list.delivery_Date}</td>
              <td>{list.delivery_StartTime}</td>
              <td>{list.delivery_EndTime}</td>
              <td>{list.delivery_Status}</td>
              <td>
                <Link to={`/update/` + list._id} type="button" className="btn btn-primary">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <button
                  onClick={() => deleteReport(list._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
