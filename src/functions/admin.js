import axios from "axios";

const apiUrl =
  process.env.REACT_APP_API ||
  "https://mern-ecommerce-react-redux.herokuapp.com/api";

export const getOrders = async (authtoken) =>
  await axios.get(`${apiUrl}/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${apiUrl}/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
