import Axios from "../api";

export const createPaymentIndent = (coupon, authtoken) =>
  Axios.post(
    `/create-payment-intent`,
    { couponApplied: coupon },
    { headers: { authtoken } }
  );
