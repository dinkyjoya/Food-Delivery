import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + '/api/order/userorders', {}, { headers: { token } });
      console.log("response data:", response.data); // Log the full response
      setData(response.data.data || []); // Ensure fallback to empty array
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Call fetchOrders on component mount
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => (
                  `${item.name} x ${item.quantity}` + (index < order.items.length - 1 ? ', ' : '')
                ))}
              </p>
              <p>Rs.{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span><b>{order.status}</b></p>
            <button>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
