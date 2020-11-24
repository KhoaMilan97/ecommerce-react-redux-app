import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Spin } from "antd";

import { getWishList, removeFromWishList } from "../../functions/user";
import UserNav from "../../components/nav/UserNav";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  const loadWishList = useCallback(() => {
    getWishList(user.token).then((res) => {
      setWishlist(res.data.wishlist);
      setLoading(false);
    });
  }, [user.token]);

  useEffect(() => {
    loadWishList();
  }, [loadWishList]);

  const handleRemove = (productId) => {
    removeFromWishList(productId, user.token).then((res) => {
      loadWishList();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10">
          <h4>Wish List</h4>
          {loading && (
            <Spin size="large" className="text-center mt-2 d-block" />
          )}
          {wishlist.length > 0 &&
            wishlist.map((p) => (
              <div key={p._id} className="alert alert-secondary">
                <Link to={`/product/${p.slug}`}>{p.title}</Link>
                <span
                  className="float-right text-danger pointer"
                  onClick={() => handleRemove(p._id)}
                >
                  <DeleteOutlined />
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
