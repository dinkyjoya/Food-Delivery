import React from "react";
import "./Explore.css";
import { food_list } from "../../assets/frontend_assets/assets";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";

const Explore = ({ id}) => {
  const categories = [...new Set(food_list.map(food => food.category))]; // Extract unique categories

const navigate = useNavigate();

  const getSingleFood =()=>{
    navigate(`/list/${id}`);
  }

  return (
    <div>
    <div className="explore-menu" id="explore-menu">
      <div className="menu-header">
        <h1>Explore Our Menu</h1>
        <p className="menu-description">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise.
        </p>
      </div>

      <div className="menu-content">
        {categories.map((category, index) => (
          <div key={index} className="menu-category-section">
            <h2 className="category-title">{category}</h2>
            <div className="category-items">
              {food_list.filter(food => food.category === category).map(food => (
                <div key={food._id} className="menu-item">
                  <img src={food.image} alt={food.name} className="menu-item-image" onClick={getSingleFood}  />
                  <div className="menu-item-details">
                    <h3>{food.name}</h3>
                    <p>{food.description}</p>
                    <span className="menu-item-price">Rs.{food.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default Explore;
