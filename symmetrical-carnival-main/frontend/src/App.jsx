import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatalogM from './MarketingManagement/CatalogM';
import CartPage from './MarketingManagement/CartPage';
import PromotionManagement from './PromotionManagement/Promotion';
import ShopRegistration from './ShopReqestration/ShopRegistration';
import ReportPage from './Report/ReportPage';
import ShopList from './ShopReqestration/ShopRegRet';
import RetrieveCartPage from './MarketingManagement/RetrieveCartPage';
import Interface from './Interface/Interface';



const App = () => {
  return (
    <Router>

    
    <div>
      <Routes>
        <Route path="/" element={<Interface/>}/>
        <Route path="/catalog" element={<CatalogM/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/promo" element={<PromotionManagement/>}/>
        <Route path="/shop" element={<ShopRegistration/>}/>
        <Route path="/shoplist" element={<ShopList/>}/>
        <Route path="/cartRet" element={<RetrieveCartPage/>}/>
        <Route path="/report" element={<ReportPage/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
