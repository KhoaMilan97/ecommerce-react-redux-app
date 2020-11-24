import axios from "axios";
const apiUrl =
  process.env.REACT_APP_API ||
  "https://mern-ecommerce-react-redux.herokuapp.com/api";

export const createCoupon = async (coupon, authtoken) => {
  return await axios.post(
    `${apiUrl}/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getCoupons = async () => {
  return await axios.get(`${apiUrl}/coupons`);
};

export const removeCoupon = async (counponId, authtoken) => {
  return await axios.delete(`${apiUrl}/coupon/${counponId}`, {
    headers: {
      authtoken,
    },
  });
};
