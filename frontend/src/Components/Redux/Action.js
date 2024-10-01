import {
  REGISTER_NEW_USER_REQUEST,
  REGISTER_NEW_USER_SUCCESS,
  REGISTER_NEW_USER_FAILURE,
  OTP_VERIFY_FAILURE,
  OTP_VERIFY_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_TO_CART_SUCCESS,
  REMOVE_TO_CART_FAILURE,
  INCREMENT_QTY,
  DECREMENT_QTY,
} from "./Contant";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";

const registerNewUser = (userData, navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_NEW_USER_REQUEST });
  try {
    const response = await axios.post("/user/add-user", userData);
    console.log("register response",response);
    
    if (response.data.success) {
      dispatch({
        type: REGISTER_NEW_USER_SUCCESS,
        payload: {
          data: response.data.newuser,
          message: response.data.message,
        },
      });
      localStorage.setItem("Email",JSON.stringify(response.data.newuser.email));
      console.log("user data saved to localstorage:", response.data.newuser);
      navigate("/verify-user");
    } else {
      dispatch({
        type: REGISTER_NEW_USER_FAILURE,
        payload: { data: response.data.message },
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_NEW_USER_FAILURE,
      payload: { data:error.response?.data?.message || error.message},
    });
  }
};

const otpVerification = ( otp, navigate) => async (dispatch) => {
  try {
    let email = JSON.parse(localStorage.getItem("Email"));
    console.log("retreived email", email);
    const response = await axios.post("/user/verify-user", {email, otp });
    console.log("Sent OTP verification request with:", { email, otp });

    console.log("otp verify response", response);
 

    if (response.data.success) {
      dispatch({
        type: OTP_VERIFY_SUCCESS,
        payload: {
          data: response.data.newuser,
          message: response.data.message,
        },
      });
      navigate("/login");
    } else {
      dispatch({
        type: OTP_VERIFY_FAILURE,
        payload: {data: response.data.message },
      });
    }
  } catch (error) {
    console.log("otp verify error:", error);
    dispatch({
      type: OTP_VERIFY_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const loginUser = (userData, navigate) => async(dispatch)=>{
    try {
        const  response = await axios.post("/user/login",userData,{
            withCredentials: true,
        });
        console.log("Login", response);

        if(response.data){
          console.log("res : ", response.data);
            localStorage.setItem("userData", JSON.stringify(response.data.newuser));
            console.log("response userData:", response.data.newuser);

            dispatch({type: LOGIN_USER_SUCCESS, 
                payload: {data: response.data.newuser, message:response.data.message},
            });
            navigate("/");
        }else{
            dispatch({type: LOGIN_USER_FAILURE,
                payload: {data: response.data.message},
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAILURE,
            payload: { data: error.response?.data?.message || error.message },
        })
    }
}


const logOut = (id) => async(dispatch)=>{
    try {
        const response = await axios.post(`/user/logout/${id}`);
        if(response.data.success){
            localStorage.removeItem("userData");
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: {data: "Logged out successfully"},
            })
        }else{
            dispatch({type: LOGOUT_FAILURE, payload: response.data.message})
        }
    } catch (error) {
        dispatch({type: LOGOUT_FAILURE, payload: error.message})
    }
}

// const addToCart =(userId, product)=> async(dispatch)=>{
//   try {
//     const response = await axios.post('/user/add-to-cart', {userId, product});
//    if(response.data.success){
//     dispatch({type: ADD_TO_CART_SUCCESS, 
//       payload: response.data.cart
//     })
//    }else{
//     dispatch({type: ADD_TO_CART_FAILURE, payload: error.response.data.message});
//    }
//   } catch (error) {
//     dispatch({type: ADD_TO_CART_FAILURE, payload: error.message});
//   }
// }


//  const removeToCart = (userId, productId) => async (dispatch) => {
//   try {
//       const response = await axios.post('/user/remove-to-cart', { userId, productId });
//       if(response.data.success){
//         dispatch({type: REMOVE_TO_CART_SUCCESS, payload: response.data.cart})
//       }else{

//         dispatch({ type: REMOVE_TO_CART_FAILURE, payload:  error.response.data.message});
//       }
//   } catch (error) {
//     dispatch({ type: REMOVE_TO_CART_FAILURE, payload:  error.message});
//   }
// };

// const incrementQty =(id)=>(dispatch)=>{
//   dispatch({type: INCREMENT_QTY, payload: id});
// }

// const decrementQty =(id)=>(dispatch)=>{
//   dispatch({type: DECREMENT_QTY, payload:id});
// }

export {registerNewUser, otpVerification, loginUser ,logOut}


