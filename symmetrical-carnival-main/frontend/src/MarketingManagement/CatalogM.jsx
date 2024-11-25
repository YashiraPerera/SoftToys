import React, { useState } from 'react';
import './Catalog.css'; 


import BWH from '../Image/BearWH.png';
import BXL from '../Image/Bearxl.png';
import BXXL from '../Image/BearXXL.png';
import BR from '../Image/BR.png';
import Dal from '../Image/Dal.png';
import Dog from '../Image/Dog.png';
import DWS from '../Image/DuckWS.png';
import Ele from '../Image/Ele.png';
import Laddy from '../Image/LadyR.png';
import Live from '../Image/LiveSize.png';
import Lobs from '../Image/LoBS.png';
import LBL from '../Image/LoveBL.png';
import MTBS from '../Image/MeToBS.png';
import Mon from '../Image/Mon.png';
import Papa from '../Image/PapaBS.png';
import Pil from '../Image/Pillow.png';
import Pooh from '../Image/Pooh.png';
import Rab from '../Image/Rabbit.png';
import Sle from '../Image/Slee.png';
import Swe from '../Image/SweetB.png';
import Tom from '../Image/TomL.png';
import catalog from '../Image/5.png';

const CatalogM = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Bear', price: 4000.00, description: 'This is product 1', size: 'XL', image: BXL, quantity: 1},
    { id: 2, name: 'Bear with Heart', price: 950.00, description: 'This is product 2', size: 'Normal', image: BWH, quantity: 1 },
    { id: 3, name: 'Bunny Rabbit', price: 1050.00, description: 'This is product 3', size: 'Normal', image: BR, quantity: 1 },
    { id: 4, name: 'Dalmatian', price: 1000.00, description: 'This is product 4', size: 'Normal', image: Dal, quantity: 1 },
    { id: 5, name: 'Dog', price: 800.00, description: 'This is product 5', size: 'Normal', image: Dog, quantity: 1 },
    { id: 6, name: 'Elephant', price: 750.00, description: 'This is product 6', size: 'Normal', image: Ele, quantity: 1 },
    { id: 7, name: 'Lady Rabbit', price: 1200.00, description: 'This is product 7', size: 'Normal', image: Laddy, quantity: 1 },
    { id: 8, name: 'Live Size', price: 10500.00, description: 'This is product 8', size: '5ft', image: Live, quantity: 1 },
    { id: 9, name: 'Love Bear', price: 1300.00, description: 'This is product 9', size: 'Large', image: LBL, quantity: 1 },
    { id: 10, name: 'Monkey', price: 850.00, description: 'This is product 10', size: 'Normal', image: Mon, quantity: 1 },
    { id: 11, name: 'Me to you Bear', price: 750.00, description: 'This is product 11', size: 'Small', image: MTBS, quantity: 1 },
    { id: 12, name: 'Papa Bear', price: 950.00, description: 'This is product 12', size: 'Normal', image: Papa, quantity: 1 },
    { id: 13, name: 'Pillow', price: 650.00, description: 'This is product 13', size: 'Normal', image: Pil, quantity: 1 },
    { id: 14, name: 'Pooh', price: 1200.00, description: 'This is product 14', size: 'Normal', image: Pooh, quantity: 1 },
    { id: 15, name: 'Rabbit', price: 1100.00, description: 'This is product 15', size: 'Normal', image: Rab, quantity: 1 },
    { id: 16, name: 'Sleeping Puppy', price: 1250.00, description: 'This is product 16', size: 'Normal', image: Sle, quantity: 1 },
    { id: 17, name: 'Sweet Baby', price: 1900.00, description: 'This is product 17', size: 'Normal', image: Swe, quantity: 1 },
    { id: 18, name: 'Tommy', price: 1050.00, description: 'This is product 18', size: 'Large', image: Tom, quantity: 1 },
    { id: 19, name: 'Bear', price: 3500.00, description: 'This is product 19', size: 'XXL', image: BXXL, quantity: 1 },
    { id: 20, name: 'Love Bear', price: 1050.00, description: 'This is product 20', size: 'Small', image: Lobs, quantity: 1 },
    { id: 21, name: 'Duck with Sound', price: 900.00, description: 'This is product 21', size: 'Normal', image: DWS, quantity: 1 },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    size: "",
    image: "",
    quantity: 1
  });

  const [errors, setErrors] = useState({});

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleQuantityChange = (id, action) => {
    setItems(items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: action === 'increment' ? item.quantity + 1 : Math.max(item.quantity - 1, 1)
        };
      }
      return item;
    }));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.size.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    
    // Prevent numeric input for name, description, and size
    if (name === 'name' || name === 'size') {
      if (/\d/.test(value)) {
        return; // Ignore the input if it contains numbers
      }
    }

    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newProduct.name) {
      newErrors.name = "Product name is required";
    } else if (/[^A-Za-z\s]/.test(newProduct.name)) {
      newErrors.name = "Product name can only contain letters and spaces";
    }

    if (!newProduct.price || isNaN(newProduct.price) || parseFloat(newProduct.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!newProduct.description) {
      newErrors.description = "Product description is required";
    } else if (/\d/.test(newProduct.description)) {
      newErrors.description = "Description cannot contain numbers";
    }

    if (!newProduct.size) {
      newErrors.size = "Product size is required";
    } else if (/\d/.test(newProduct.size)) {
      newErrors.size = "Size cannot contain numbers";
    }

    if (newProduct.image && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(newProduct.image)) {
      newErrors.image = "Image URL must be a valid URL and an image";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newProductToAdd = {
        ...newProduct,
        id: items.length + 1,
        price: parseFloat(newProduct.price), // Ensure price is a number
      };

      setItems([...items, newProductToAdd]);

      setNewProduct({
        name: "",
        price: "",
        description: "",
        size: "Normal",
        image: "",
        quantity: 1,
      });
      setErrors({});
    }
  };

  return (
    <div
    className="custom-background"
    style={{ backgroundImage: `url(${catalog})` }} // Adding the background image
  >
    <div>
     
      <div className="catalog-container">
        <h1 className="text-3xl font-bold mb-4">Production Catalog</h1>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border rounded"
        />

        <div className="catalog-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="catalog-item"
              onClick={() => handleSelectItem(item)}
            >
              <img src={item.image} alt={item.name} className="catalog-image" />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-md font-medium">Rs {item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-600">Size: {item.size}</p>

              {/* Quantity Controls */}
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, 'decrement')} className="quantity-button">-</button>
                <span className="quantity-display">{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 'increment')} className="quantity-button">+</button>
              </div>
              <button className="cart-button">Add to Cart</button>
            </div>
          ))}
        </div>

        {/* Display selected item details */}
        {selectedItem && (
          <div className="selected-item-details mt-8 p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Selected Item Details</h2>
            <img src={selectedItem.image} alt={selectedItem.name} className="catalog-image" />
            <h3 className="text-lg font-semibold">{selectedItem.name}</h3>
            <p className="text-md font-medium">Rs {selectedItem.price.toFixed(2)}</p>
            <p className="text-sm text-gray-600">{selectedItem.description}</p>
            <p className="text-sm text-gray-600">Size: {selectedItem.size}</p>
            <p className="text-sm text-gray-600">Quantity: {selectedItem.quantity}</p>
          </div>
        )}

        {/* Add New Product Form */}
        <div className="add-product-form mt-8 p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">Add a New Product</h2>
          <form onSubmit={handleAddProduct}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleNewProductChange}
              className="p-2 border rounded mb-2"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleNewProductChange}
              className="p-2 border rounded mb-2"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
            
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={handleNewProductChange}
              className="p-2 border rounded mb-2"
            />
            {errors.description && <p className="text-red-500">{errors.description}</p>}
            
            <input
              type="text"
              name="size"
              placeholder="Size"
              value={newProduct.size}
              onChange={handleNewProductChange}
              className="p-2 border rounded mb-2"
            />
            {errors.size && <p className="text-red-500">{errors.size}</p>}
            
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={handleNewProductChange}
              className="p-2 border rounded mb-2"
            />
            {errors.image && <p className="text-red-500">{errors.image}</p>}
            
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Product</button>
          </form>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default CatalogM;
