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
} from "./Contant";

const initialState = {
  user: {},
  isLoading: false,
  success: "",
  error: "",
  cart: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_NEW_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_NEW_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.data,
        success: action.payload.message,
      };
    case REGISTER_NEW_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case OTP_VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.data,
        success: action.payload.message,
      };
    case OTP_VERIFY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.data,
        success: action.payload.message,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        success: action.payload.data,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    // case ADD_TO_CART_SUCCESS:
    //   return {
    //     ...state,
    //     cart: action.payload.data,
    //     success: action.payload,
    //   };

    // case ADD_TO_CART_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };
    // case REMOVE_TO_CART_SUCCESS:
    //   return {
    //     ...state,
    //     cart: action.payload.data,
    //     success: action.payload.message,
    //   };
    // case REMOVE_TO_CART_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };

    default:
      return state;
  }
};

export { userReducer };
