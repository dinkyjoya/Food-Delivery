import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/frontend_assets/assets";
import Footer from "../footer/Footer";

const AppDownload = () => {
  return (
    <div>
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download <br /> Foodie App
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
      <div className="mobile-view">
        <img src="/final_mobile.png" alt="mobile" />
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AppDownload;
