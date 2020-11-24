import axios from "axios";
const apiUrl =
  process.env.REACT_APP_API ||
  "https://mern-ecommerce-react-redux.herokuapp.com/api";

export const getCategories = async () => {
  return await axios.get(`${apiUrl}/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(`${apiUrl}/category/${slug}`);
};

export const createCategory = async (category, authtoken) => {
  return await axios.post(`${apiUrl}/category`, category, {
    headers: {
      authtoken,
    },
  });
};

export const updateCategory = async (slug, category, authtoken) => {
  return await axios.put(`${apiUrl}/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });
};

export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`${apiUrl}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getSubsCategory = async (_id) => {
  return await axios.get(`${apiUrl}/category/subs/${_id}`);
};
