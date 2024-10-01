import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.baseURL = "http://localhost:8000";

const List = () => {
  

  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`/api/food/list`);
    console.log("response", response);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`/api/food/remove`, {
        id: foodId,
      });
      if (response.data.success) {
        // Remove item from the list in the frontend
        setList((prevList) => prevList.filter((item) => item._id !== foodId));
        toast.success("Food item removed successfully");
      } else {
        toast.error("Failed to remove food item");
      }
    } catch (error) {
      console.error("Error removing food item:", error);
      toast.error("An error occurred while removing the food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
            
              <img src={`http://localhost:8000/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cross-icon">
                x
              </p>
            
            </div>
         
          );
        })}
      </div>
    </div>
  );
};

export default List;
