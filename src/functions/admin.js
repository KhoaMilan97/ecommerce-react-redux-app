import Axios from "../api";

export const getOrders = async (authtoken) =>
  await Axios.get(`/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await Axios.put(
    `/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
