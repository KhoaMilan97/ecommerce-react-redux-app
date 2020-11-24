import Axios from "../api";

export const getSubs = async () => {
  return await Axios.get(`/subs`);
};

export const getSub = async (slug) => {
  return await Axios.get(`/sub/${slug}`);
};

export const createSub = async (sub, authtoken) => {
  return await Axios.post(`/sub`, sub, {
    headers: {
      authtoken,
    },
  });
};

export const updateSub = async (slug, sub, authtoken) => {
  return await Axios.put(`/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });
};

export const removeSub = async (slug, authtoken) => {
  return await Axios.delete(`/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });
};
