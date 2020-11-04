import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

import { currentAdmin } from "../../functions/auth";

function AdminRouter({ children, ...rest }) {
  const [admin, setAdmin] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("ADMIN RESPONSE", res);
          setAdmin(true);
        })
        .catch((err) => {
          console.log("NOT ADMIN", err);
        });
    }
  }, [user]);

  return admin ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
}

export default AdminRouter;
