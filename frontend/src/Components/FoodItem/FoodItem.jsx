import React, { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);
  const navigate = useNavigate();

  const getSingleFood =()=>{
    navigate(`/list/${id}`);
  }

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" onClick={getSingleFood}  src={url + "/images/"+ image} alt="" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
            />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">Rs.{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
