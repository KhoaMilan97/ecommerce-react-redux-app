import axios from "axios";
const apiUrl =
  process.env.REACT_APP_API ||
  "https://mern-ecommerce-react-redux.herokuapp.com/api";

export const userCart = (cart, authtoken) =>
  axios.post(`${apiUrl}/user/cart`, { cart }, { headers: { authtoken } });

export const getUserCart = (authtoken) =>
  axios.get(`${apiUrl}/user/cart`, {
    headers: { authtoken },
  });

export const removeUserCart = (authtoken) =>
  axios.delete(`${apiUrl}/user/cart`, {
    headers: { authtoken },
  });

export const saveUserAddress = (address, authtoken) =>
  axios.post(`${apiUrl}/user/address`, { address }, { headers: { authtoken } });

export const applyCoupon = (coupon, authtoken) =>
  axios.post(
    `${apiUrl}/user/cart/coupon`,
    { coupon },
    { headers: { authtoken } }
  );

export const createOrder = (stripeResponse, authtoken) =>
  axios.post(
    `${apiUrl}/user/order`,
    { stripeResponse },
    { headers: { authtoken } }
  );

export const getOrders = (authtoken) =>
  axios.get(`${apiUrl}/user/order`, {
    headers: { authtoken },
  });

export const getWishList = (authtoken) =>
  axios.get(`${apiUrl}/user/wishlist`, {
    headers: { authtoken },
  });

export const addToWishList = (productId, authtoken) =>
  axios.post(
    `${apiUrl}/user/wishlist`,
    { productId },
    {
      headers: { authtoken },
    }
  );

export const removeFromWishList = (productId, authtoken) =>
  axios.put(
    `${apiUrl}/user/wishlist/${productId}`,
    {},
    {
      headers: { authtoken },
    }
  );

export const createCashOrderForUser = (COD, couponTrueOrFalse, authtoken) =>
  axios.post(
    `${apiUrl}/user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD },
    {
      headers: { authtoken },
    }
  );
