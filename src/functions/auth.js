import Axios from "../api";

export const updateOrCreateUser = async (authtoken) => {
  return await Axios.post(
    `/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await Axios.post(
    `/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await Axios.post(
    `/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
