import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
