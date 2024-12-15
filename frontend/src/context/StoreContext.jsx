import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast} from 'react-hot-toast'


export const StoreContext = createContext(null);

//StoreContext is created to hold and provide the cart state and functions

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://localhost:8000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const navigate = useNavigate();

  const addToCart = async(itemId) => {
    if(!token){
      alert("Please login or signup to add items to the cart");
      navigate("/register");
      return;
    }
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    }
    if(token){
      try {
        await axios.post(url + "/api/cart/add",{itemId},{headers:{token}});
        toast.success("Item added to Cart!");
      } catch (error) {
        console.error("Error adding item to cart", error);
      toast.error("Failed to add item to cart");

      }
     
    }
  };


  const removeFromCart = async(itemId) => {
    if (cartItems[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      setCartItems((prev) => {
        const newCartItems = { ...prev };
        delete newCartItems[itemId];
        return newCartItems;
      });
    }
  
    if(token){
      await axios.delete(url + "/api/cart/remove",{headers:{token}, data:{itemId}});
      toast.success('Successfully toasted!')
    }
  };

  // const removeAllFromCart = async()=>{
  //   if(token){
  //     try {
  //       await axios.delete(url + '/api/cart/clear-cart',{headers:{token}});
  //       setCartItems({});
  //       toast.success("All items removed from cart",error);
  //     } catch (error) {
  //       console.error("Error removing all items from cart", error);
  //       toast.error("Failed to remove all items from cart");
  //     }
  //   }
  //   return Promise.resolve(); // Ensure the function returns a Promise
  // }


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(url + "/api/cart/get", { headers: { token } });
      setCartItems(response.data.cartData || {});  // Default to an empty object if cartData is undefined
    } catch (error) {
      console.error("Error loading cart data", error);
    }
  };


  useEffect(() => {
   async function loadData(){
    try {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      await loadCartData(localStorage.getItem("token"))
      }
    } catch (error) {
      console.log("error", error)
    }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    // removeAllFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
