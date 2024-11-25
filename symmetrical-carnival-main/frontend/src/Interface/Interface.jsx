import React from 'react';
import { Link } from "react-router-dom";
import ui from '../Image/ui1.png';


function Interface() {
  return (
    <div className="flex flex-col h-screen font-poppins bg-gradient-to-br from-purple-100 via-white to-pink-50">
    

      
      
      <div className="flex-1 flex justify-center items-center bg-pink-100 rounded-3xl shadow-xl mx-16 my-8 border border-gray-200"> {/* Updated background color */}
        
        {/* Content Section */}
        <div className="max-w-lg text-left space-y-6 p-10">
          <h1 className="text-5xl font-extrabold text-purple-600 mb-4 whitespace-nowrap">
            Catalog and Marketing Management
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
          The Catalog and Marketing Management streamlines product management and promotions by organizing listings, tracking inventory, and running targeted campaigns. 
          It enables businesses to optimize sales through promotions, customer segmentation, and performance reporting, 
          improving operational efficiency and enhancing customer engagement.
          </p>
          
          {/* Navigation Buttons */}
          <div className="space-y-4">
            <Link to="catalog">
              <button className="w-full py-1 px-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-300 to-purple-300 rounded-full hover:from-pink-200 hover:to-purple-200 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
                Catalog
              </button>
            </Link>
            <br></br>
            <br></br>
            <Link to="cart">
              <button className="w-full py-1 px-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-300 to-purple-300 rounded-full hover:from-pink-200 hover:to-purple-200 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
                Cart
              </button>
            </Link>
            <br></br>
            <br></br>
            <Link to="cartRet">
              <button className="w-full py-1 px-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-300 to-purple-300 rounded-full hover:from-pink-200 hover:to-purple-200 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
              Retrieve Cart
              </button>
            </Link>
            <br></br>
            <br></br>
            <Link to="promo">
              <button className="w-full py-1 px-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-300 to-purple-300 rounded-full hover:from-pink-200 hover:to-purple-200 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
                Promotions
              </button>
            </Link>
            <br></br>
            <br></br>
            <Link to="shop">
              <button className="w-full py-1 px-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-300 to-purple-300 rounded-full hover:from-pink-200 hover:to-purple-200 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
                Shop Registration
              </button>
            </Link>
            <br></br>
            <br></br>
            <Link to="shoplist">
              <button className="w-full py-1 px-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-300 to-purple-300 rounded-full hover:from-pink-200 hover:to-purple-200 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
                Shop List
              </button>
            </Link>
            <br></br>
            <br></br>
            <Link to="report">
              <button className="w-full py-1 px-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-300 to-purple-300 rounded-full hover:from-pink-200 hover:to-purple-200 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
                Report
              </button>
            </Link>
          </div>
        </div>
        
        {/* Illustration Section */}
        <div className="hidden lg:block w-1/3 max-w-xl">
          <img
            src={ui}
            alt="Soft Toys Production Illustration"
            className="w-full h-auto rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
            style={{ maxHeight: '350px' }} // Set a max height for the image
          />
        </div>
      </div>
    
  
    </div>
   
  );
}

export default Interface;