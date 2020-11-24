import axios from "axios";
const apiUrl =
  process.env.REACT_APP_API ||
  "https://mern-ecommerce-react-redux.herokuapp.com/api";

export const getSubs = async () => {
  return await axios.get(`${apiUrl}/subs`);
};

export const getSub = async (slug) => {
  return await axios.get(`${apiUrl}/sub/${slug}`);
};

export const createSub = async (sub, authtoken) => {
  return await axios.post(`${apiUrl}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
};

export const updateSub = async (slug, sub, authtoken) => {
  return await axios.put(`${apiUrl}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });
};

export const removeSub = async (slug, authtoken) => {
  return await axios.delete(`${apiUrl}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });
};
