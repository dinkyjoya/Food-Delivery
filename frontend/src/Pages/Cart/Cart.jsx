import React, { useContext, useState, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url ,userId} = useContext(StoreContext);
  
  const navigate = useNavigate();
 

  useEffect(() => {
    // Save cart items count to localStorage whenever cartItems changes
    localStorage.setItem("cartItemsCount", JSON.stringify(cartItems));
  }, [cartItems]);



  const handleCheckout = async () => {
   
        navigate("/order");
    
  };
  


  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div
                  // key={item._id}
                  className="cart-items-title cart-items-item"
                >
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          // if(quantity > 0){
        })}
      </div>
      <div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Sub Total</p>
                <p>Rs.{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs.{getTotalCartAmount() === 0 ? 0 : 20}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>

            {/* {orderSuccess ? (
              <div className="order-success-message">
                <img
                  src=" https://img.freepik.com/free-vector/green-double-circle-check-mark_78370-1749.jpg?ga=GA1.1.1532231081.1725048301&semt=ais_hybrid"
                  alt=""
                />
                <h3>Thank you for your order!</h3>
              </div>
            ) : ( */}
              <div className="order-success-message">
                <button onClick={handleCheckout}>PROCEED TO BUY</button>
              </div>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
