import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (e) => {
      const name = e.target.name;
       const value = e.target.value;
       setUserData((userData) => ({ ...userData, [name]: value }));
     };

    const placeOrder =async(e)=>{
      e.preventDefault();

      let orderItems =[];

      food_list.map((item)=>{
        if(cartItems[item._id]>0){
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      })
      // console.log("orderItems",orderItems);

     let orderData ={
      address:userData,
      items:orderItems,
      amount:getTotalCartAmount()+20,
     }



     try {
      let response = await axios.post(url + '/api/order/place', orderData, { headers: { token } });
      if (response.data.success) {
        const {session_url} = response.data;
        window.location.replace(session_url);   //send the user on the session_url we will use window.location.replace
          console.log("Order placed successfully:", response.data);
          // Handle successful order placement (e.g., redirect to My Orders)
      }
      else{
        alert("Error");
      }
  } catch (error) {
      console.error("Error placing order:", error);
  }
};

const navigate = useNavigate();

useEffect(()=>{
  if(!token){
navigate('/cart')
  }else if(getTotalCartAmount()===0){
navigate('/cart')
  }
},[token])
     


  return (
    <form  onSubmit={placeOrder} className="place-order">
      <div className='place-order-left'>
        <h3 className='title'>Delivery Information</h3>
        <div className='multi-fields'>
          <input name='firstName' onChange={onChangeHandler} value={userData.firstName} type="text" placeholder='First Name' required/>
          <input name='lastName' onChange={onChangeHandler} value={userData.lastName} type="text" placeholder='Last Name' required/>
        </div>
        <input name='email' onChange={onChangeHandler} value={userData.email} type="email" id="email" placeholder='Email' required />
        <input name='street' onChange={onChangeHandler} value={userData.street} type="text" id="street" placeholder='Street' required />
        <div className='multi-fields'>
          <input name='city' onChange={onChangeHandler} value={userData.city} type="text" id="city" placeholder='City' required />
          <input name='state' onChange={onChangeHandler} value={userData.state} type="text" id="state" placeholder='State' required />
        </div>
        <div className='multi-fields'>
          <input name='zipcode' onChange={onChangeHandler} value={userData.zipcode} type="text" id="zipcode" placeholder='Zip Code' required />
          <input name='country' onChange={onChangeHandler} value={userData.country} type="text" id="country" placeholder='Country' required />
        </div>
        <input name='phone' onChange={onChangeHandler} value={userData.phone} type="tel" id="phone" placeholder='Phone' required />
      </div>
      <div className='place-order-right'>
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
              <b>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <div className="order-success-message">
            {/* <button type='submit'>PROCEED TO PAYMENT</button> */}
            <button class="button"  type="submit">PROCEED TO PAYMENT</button>

          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
