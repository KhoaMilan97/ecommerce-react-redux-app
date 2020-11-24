import axios from "axios";
const apiUrl =
  process.env.REACT_APP_API ||
  "https://mern-ecommerce-react-redux.herokuapp.com/api";

export const createProduct = async (product, authtoken) => {
  return await axios.post(`${apiUrl}/product`, product, {
    headers: {
      authtoken,
    },
  });
};

export const getProductsByCount = async (count) => {
  return await axios.get(`${apiUrl}/products/${count}`);
};

export const removeProduct = async (slug, authtoken) => {
  return await axios.delete(`${apiUrl}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getProduct = async (slug) => {
  return await axios.get(`${apiUrl}/product/${slug}`);
};

export const updateProduct = async (slug, product, authtoken) => {
  return await axios.put(`${apiUrl}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });
};

export const getProducts = async (sort, order, page) => {
  return await axios.post(`${apiUrl}/products`, {
    sort,
    order,
    page,
  });
};

export const getProductsCount = async () => {
  return await axios.get(`${apiUrl}/products/total`);
};

export const productStar = async (productId, star, authtoken) => {
  return await axios.post(
    `${apiUrl}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getRelated = async (productId) => {
  return await axios.get(`${apiUrl}/product/related/${productId}`);
};

export const fetchProductsByFilter = async (arg) => {
  return await axios.post(`${apiUrl}/search/filters`, arg);
};
