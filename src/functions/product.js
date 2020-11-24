import Axios from "../api";

export const createProduct = async (product, authtoken) => {
  return await Axios.post(`/product`, product, {
    headers: {
      authtoken,
    },
  });
};

export const getProductsByCount = async (count) => {
  return await Axios.get(`/products/${count}`);
};

export const removeProduct = async (slug, authtoken) => {
  return await Axios.delete(`/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getProduct = async (slug) => {
  return await Axios.get(`/product/${slug}`);
};

export const updateProduct = async (slug, product, authtoken) => {
  return await Axios.put(`/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });
};

export const getProducts = async (sort, order, page) => {
  return await Axios.post(`/products`, {
    sort,
    order,
    page,
  });
};

export const getProductsCount = async () => {
  return await Axios.get(`/products/total`);
};

export const productStar = async (productId, star, authtoken) => {
  return await Axios.post(
    `/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getRelated = async (productId) => {
  return await Axios.get(`/product/related/${productId}`);
};

export const fetchProductsByFilter = async (arg) => {
  return await Axios.post(`/search/filters`, arg);
};
