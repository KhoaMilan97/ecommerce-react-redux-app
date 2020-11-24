import Axios from "../api";

export const createCoupon = async (coupon, authtoken) => {
  return await Axios.post(
    `/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getCoupons = async () => {
  return await Axios.get(`/coupons`);
};

export const removeCoupon = async (counponId, authtoken) => {
  return await Axios.delete(`/coupon/${counponId}`, {
    headers: {
      authtoken,
    },
  });
};
