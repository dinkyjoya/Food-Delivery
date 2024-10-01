import React from "react";
import Navbar from "./Components/Navbar";
import { Routes, Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import SearchResult from "./Components/ExploreMenu/SearchResult/SearchResult.jsx";
import LoginPopup from "./Components/Login/LoginPopup.jsx";
import { useState } from "react";
import SinglePage from "./Components/SinglePage/SinglePage.jsx";
import ContactUs from "./Components/ContactUs/ContactUs.jsx";
import AppDownload from "./Components/AppDownload/AppDownload.jsx";
import Explore from "./Components/ExploreMenu/Explore.jsx";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder.jsx";
import VerifyOrder from "./Pages/verify/VerifyOrder.jsx";
import MyOrders from "./Pages/myorders/MyOrders.jsx";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder/>}/>
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<LoginPopup setShowLogin={setShowLogin} />}/>
          <Route path="/list/:id" element={<SinglePage />} />
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/app-download" element={<AppDownload/>}/>
          <Route path="/search" element={<SearchResult/>}/>
          <Route path="/verify" element={<VerifyOrder/>}/>
<Route path="/myorders" element={<MyOrders/>} />
        </Routes>
    
      </div>
    </>
  );
};

export default App;
