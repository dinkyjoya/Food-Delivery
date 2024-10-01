import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
     <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img
            src="https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png"
            width="100"
            alt="logo"
          />
          <h1>Foodbite</h1>
          <div className="social-icons">
         <img src={assets.facebook_icon} alt="facebook"/>
         <img src={assets.twitter_icon} alt="twitter"/>
         <img src={assets.linkedin_icon} alt="LinkedIn"/>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/explore">Menu</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 8778967545</li>
            <li>contact@Foodbite.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">
        Copyright 2024 &#169; foodbite.com - All Right Reserved.
      </p>
    </div>
    </>
  );
};

export default Footer;
