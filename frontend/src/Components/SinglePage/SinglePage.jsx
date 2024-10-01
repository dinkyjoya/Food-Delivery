import React, { useState, useEffect, useContext } from "react";
import "./SinglePage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { StoreContext } from "../../context/StoreContext";
import { Toaster, toast } from "react-hot-toast";

const SinglePage = () => {
  const { addToCart } = useContext(StoreContext);
  const { id } = useParams();
  const [singleFood, setSingleFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/food/list/${id}`);
        setSingleFood(response.data.singleFood);
        // console.log("single response", response);
      } catch (error) {
        console.error("Error fetching product details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!singleFood) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-detail">
      <Toaster position="bottom-right" reverseOrder={false} />

      <img
        src={`http://localhost:8000/images/${singleFood.image}`}
        alt={singleFood.name}
      />
      <div className="product-details">
        <h2>{singleFood.name}</h2>
        <p className="description">{singleFood.description}</p>
        <p className="price">Rs.{singleFood.price}</p>
        <p className="stars">⭐⭐⭐⭐⭐</p>
        <button onClick={() => addToCart(id)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default SinglePage;
