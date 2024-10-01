import React, { useEffect, useState } from "react";
import "./Order.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../../assets/admin_assets/assets";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log("data", response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Network Error: Unable to fetch orders");
    }
  };

 const statusHandler = async(e,orderId)=>{
const response = await axios.post(url +'/api/order/status',{
  orderId,
  status:e.target.value
})
if(response.data.success){
  await fetchAllOrders();
}
 } 

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item"> {/* Use a unique ID if available */}
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  <span key={item.id || index}> {/* Use a unique ID for items if available */}
                    {`${item.name} x ${item.quantity}`}
                    {index < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>Rs.{order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
