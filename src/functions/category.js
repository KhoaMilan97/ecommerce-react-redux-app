import Axios from "../api";

export const getCategories = async () => {
  return await Axios.get(`/categories`);
};

export const getCategory = async (slug) => {
  return await Axios.get(`/category/${slug}`);
};

export const createCategory = async (category, authtoken) => {
  return await Axios.post(`/category`, category, {
    headers: {
      authtoken,
    },
  });
};

export const updateCategory = async (slug, category, authtoken) => {
  return await Axios.put(`/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });
};

export const removeCategory = async (slug, authtoken) => {
  return await Axios.delete(`/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getSubsCategory = async (_id) => {
  return await Axios.get(`/category/subs/${_id}`);
};
