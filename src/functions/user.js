import Axios from "../api";

export const userCart = (cart, authtoken) =>
  Axios.post(`/user/cart`, { cart }, { headers: { authtoken } });

export const getUserCart = (authtoken) =>
  Axios.get(`/user/cart`, {
    headers: { authtoken },
  });

export const removeUserCart = (authtoken) =>
  Axios.delete(`/user/cart`, {
    headers: { authtoken },
  });

export const saveUserAddress = (address, authtoken) =>
  Axios.post(`/user/address`, { address }, { headers: { authtoken } });

export const applyCoupon = (coupon, authtoken) =>
  Axios.post(`/user/cart/coupon`, { coupon }, { headers: { authtoken } });

export const createOrder = (stripeResponse, authtoken) =>
  Axios.post(`/user/order`, { stripeResponse }, { headers: { authtoken } });

export const getOrders = (authtoken) =>
  Axios.get(`/user/order`, {
    headers: { authtoken },
  });

export const getWishList = (authtoken) =>
  Axios.get(`/user/wishlist`, {
    headers: { authtoken },
  });

export const addToWishList = (productId, authtoken) =>
  Axios.post(
    `/user/wishlist`,
    { productId },
    {
      headers: { authtoken },
    }
  );

export const removeFromWishList = (productId, authtoken) =>
  Axios.put(
    `/user/wishlist/${productId}`,
    {},
    {
      headers: { authtoken },
    }
  );

export const createCashOrderForUser = (COD, couponTrueOrFalse, authtoken) =>
  Axios.post(
    `/user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD },
    {
      headers: { authtoken },
    }
  );
