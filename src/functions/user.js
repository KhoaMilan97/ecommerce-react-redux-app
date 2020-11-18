import axios from "axios";

export const userCart = (cart, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    { headers: { authtoken } }
  );

export const getUserCart = (authtoken) =>
  axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: { authtoken },
  });

export const removeUserCart = (authtoken) =>
  axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: { authtoken },
  });

export const saveUserAddress = (address, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    { headers: { authtoken } }
  );

export const applyCoupon = (coupon, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    { headers: { authtoken } }
  );
