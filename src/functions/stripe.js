import axios from "axios";
const apiUrl =
  process.env.REACT_APP_API ||
  "https://mern-ecommerce-react-redux.herokuapp.com/api";

export const createPaymentIndent = (coupon, authtoken) =>
  axios.post(
    `${apiUrl}/create-payment-intent`,
    { couponApplied: coupon },
    { headers: { authtoken } }
  );
